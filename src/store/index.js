import Vue from "vue";
import Vuex from "vuex";
import deck from "./modules/deck.js"
import alert from "./modules/alert.js"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        role: "thief",
        endOn: false, // 決定是否出現結束回合彈窗
        firstRound: true, // 決定是否遊戲第一回合
        thiefFirst: true,  // 決定是否逃亡者第一回合
        draggable: true, // 決定可否拖放卡牌
        invalid: false, // 決定是否不能向卡牌作互動
        special: false
    },
    getters:{
        getRole(state) {
            return state.role
        },
        getEndOn(state) {
            return state.endOn
        },
        getFirstRound(state) {
            return state.firstRound
        },
        getThiefFirst(state) {
            return state.thiefFirst
        },
        getDraggable(state) {
            return state.draggable
        },
        getInvalid(state) {
            return state.invalid
        },
        getSpecial(state) {
            return state.special
        },
    },
    mutations: {
        changeRole(state, role) {
            state.role = role;
        },
        turnEndOn(state) {
            state.endOn = !state.endOn;
        },
        changeFirstRound(state) {
            state.firstRound = !state.firstRound;
        },
        changeInvalid(state) {
            state.invalid = !state.invalid;
        },
        changeThiefFirst(state) {
            state.thiefFirst = !state.thiefFirst;
        },
        changeDraggable(state) {
            state.draggable = !state.draggable;
        },
        changeSpecial(state) {
            state.special = !state.special;
        },
    },
    actions: {
        async thiefEnd({ commit, dispatch }) {
            await commit('changeInvalid');
            await commit('turnEndOn');
            await commit('changeDraggable');
            let msg = `你的行動已執行完成！`;
            await dispatch('setStateBox', {
                icon: 'success',
                msg: msg,
                status: 'normal',
                size: 'small'
            });
            await commit('clearPrev');
        },
        gameReset({ commit, dispatch, state }) {
            commit('changeRole', "thief");
            dispatch('initDeck');
            commit('initAlert');

            if (state.invalid)
                commit('changeInvalid');
            if (state.endOn)
                commit('turnEndOn');
            if (state.special)
                commit('changeSpecial');
            if (!state.firstRound)
                commit('changeFirstRound');
            if (!state.draggable)
                commit('changeDraggable');
            if (!state.thiefFirst)
                commit('changeThiefFirst');
        },
        gameStart({dispatch}) {
            setTimeout(function(){
                let msg = "遊戲開始，第一回合由逃亡者開始";
                dispatch('setStateBox', ({
                    icon: 'info',
                    msg: msg,
                    status: 'start',
                    size: "small"
                }));
            },1000)
        },
        endUp({ commit, dispatch, state }) {

            let roleList = [{ en: "thief", cn: "逃亡者" }, { en: "police", cn: "神探" }],
                msg = "",
                nextRole;


            if (state.role == "thief") {
                msg = roleList[0].cn + "行動已結束，輪到" + roleList[1].cn + "行動"
                nextRole = roleList[1].en;
            } else {
                msg = roleList[1].cn + "行動已結束，輪到" + roleList[0].cn + "行動"
                nextRole = roleList[0].en;
            }

            if (state.firstRound && state.role == "police") {
                commit('changeFirstRound');
            }
            commit('changeRole', nextRole);
            commit('turnEndOn');
            commit('changeInvalid');
            commit('changeCurrentTab');
            if (nextRole == "thief")
                commit('changeDraggable');

            dispatch('setStateBox', ({
                icon: 'info',
                msg: msg,
                status: 'start',
                size: "medium"
            }));
        },
        spacialStart({ commit, state }) {
            commit('changeSpecial');
            commit('changeCurrentTab');
            commit('changeRole', "police");
            if (state.invalid)
                commit('changeInvalid');
            if (state.endOn)
                commit('turnEndOn');

            commit('turnBoxOn', 'hand')
        },
    },
    modules: { deck, alert }
});
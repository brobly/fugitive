import Vue from "vue";
import Vuex from "vuex";
import deck from "./modules/deck.js"
import alert from "./modules/alert.js"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        phase: 0,
        role: "thief",
        endOn: false,
        firstRound: true,
        thiefFirst: true,
        draggable: true,
        disabled: false,
        special: false

    },
    getters: {
        getRole(state) {
            return state.role
        },
        getEndOn(state) {
            return state.endOn
        },
        getDisable(state) {
            return state.disabled
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
        getSpecial(state) {
            return state.special
        }

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
        changeDisabled(state) {
            state.disabled = !state.disabled;
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
        thiefEnd({ commit, dispatch }) {
            commit('changeDisabled');
            commit('turnEndOn');
            commit('changeDraggable');
            let msg = `你的行動已執行完成！`;
            dispatch('setStateBox', {
                icon: 'success',
                msg: msg,
                status: 'normal',
                size: 'small'
            });
            commit('clearPrev');
        },
        gameStart({ commit, dispatch, state }) {
            let msg = "第一回合由逃亡者開始";
            commit('changeRole', "thief");
            commit('initAlert');

            if (state.disabled)
                commit('changeDisabled');
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

            dispatch('initDeck');
            dispatch('setStateBox', ({
                icon: 'info',
                msg: msg,
                status: 'start',
                size: "small"
            }));

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
            commit('changeDisabled');
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
            if (state.disabled)
                commit('changeDisabled');
            if (state.endOn)
                commit('turnEndOn');

            commit('turnBoxOn', 'hand')
        },
    },
    modules: { deck, alert }
});
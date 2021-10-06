import Vue from "vue";
import Vuex from "vuex";
import alert from "./modules/alert.js"
import deck from "./modules/deck.js"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        phase: 0,
        role: "thief",
        endOn: false,
        firstRound: true,
        thiefFirst: true,
        draggable: true,
        disabled: false

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
        getThiefFirst(state) {
            return state.thiefFirst
        },
        getDraggable(state) {
            return state.draggable
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
            state.firstRound = false;
        },
        changeDisabled(state) {
            state.disabled = !state.disabled;
        },
        changeThiefFirst(state) {
            state.thiefFirst = false;
        },
        changeDraggable(state) {
            state.draggable = !state.draggable;
        },
    },
    actions: {
        thiefEnd({ commit }) {
            commit('changeDisabled');
            commit('closeBox');
            commit('turnEndOn');
            commit('changeDraggable');
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

            commit('changeRole', nextRole);
            commit('turnEndOn');

            if (state.firstRound) {

                commit('changeFirstRound');
                dispatch('setStateBox', ({
                    icon: 'info',
                    msg: msg,
                    status: 'normal'
                }));
            } else {
                commit('turnBoxOn', "draw")
            }
        }
    },
    modules: { alert, deck }
});
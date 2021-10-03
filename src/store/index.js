import Vue from "vue";
import Vuex from "vuex";
import alert from "./modules/alert.js"
import deck from "./modules/deck.js"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        phase: 0,
        role: "thief",
        firstRound: true,
        draggable: true,
        disabled: false

    },
    getters: {
        getRole(state) {
            return state.role
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
        changeDisabled(state) {
            state.disabled = !state.disabled;
        },
        changeDraggable(state) {
            state.draggable = !state.draggable;
        },
    },
    actions: {},
    modules: { alert, deck }
});
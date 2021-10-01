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

    },
    getters: {
        getRole(state) {
            return state.role
        },

    },
    mutations: {
        changeRole(state, role) {
            state.role = role;
        },
    },
    actions: {},
    modules: { alert, deck }
});
const store = {
    state: {
        blackOn: false,
        openBox: "",
        boxIcon: "",
        stateText: "",
        boxState: "",
        prevBox: ""
    },
    getters: {
        getBlackOn(state) {
            return state.blackOn
        },
        getBoxOn(state) {
            return state.openBox;
        },
        getBoxIcon(state) {
            return state.boxIcon
        },
        getStateText(state) {
            return state.stateText
        },
        getBoxState(state) {
            return state.boxState
        },
    },
    mutations: {
        turnBoxOn(state, box) {
            state.blackOn = true;
            state.openBox = box;
        },
        closeBox(state) {
            state.blackOn = false;
            state.openBox = "";
        },
        setBoxIcon(state, icon) {
            state.boxIcon = icon
        },
        setStateText(state, msg) {
            state.stateText = msg;
        },
        setBoxState(state, status) {
            state.boxState = status;
        },
        turnAlertOn(state) {
            state.blackOn = true;
            state.prevBox = state.openBox;
            state.openBox = "alert"
        },
        closeAlertBox(state) {
            state.openBox = state.prevBox;
            if (state.openBox == "alert") {
                state.blackOn = false;
                state.openBox = "";
            }
        }
    },
    actions: {
        setStateBox({ commit }, payload) {
            commit('turnAlertOn');
            commit('setBoxIcon', payload.icon);
            commit('setStateText', payload.msg);
            commit('setBoxState', payload.status);
        }
    },
    modules: {}
}

export default store
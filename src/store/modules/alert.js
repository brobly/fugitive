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
            if (box) {
                state.openBox = box;
            } else {
                state.prevBox = state.openBox;
                state.openBox = "alert"
            }
        },
        closeBox(state) {
            if (state.prevBox == "" || state.prevBox == "alert") {
                state.blackOn = false;
                state.openBox = "";
            } else {
                state.openBox = state.prevBox;
                state.prevBox = "";
            }

        },
        clearPrev(state) {
            state.prevBox = "";
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
        initAlert(state) {
            state.blackOn = false,
                state.openBox = "",
                state.boxIcon = "",
                state.stateText = "",
                state.boxState = "",
                state.prevBox = ""
        }
    },
    actions: {
        setStateBox({ commit }, payload) {
            commit('turnBoxOn');
            commit('setBoxIcon', payload.icon);
            commit('setStateText', payload.msg);
            commit('setBoxState', payload.status);
        }
    },
    modules: {}
}

export default store
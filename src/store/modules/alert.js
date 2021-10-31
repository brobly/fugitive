const store = {
    state: {
        blackOn: false,
        openBox: "",
        boxIcon: "",
        stateText: "",
        boxState: "",
        prevBox: "",
        boxSize: ""
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
        getBoxSize(state) {
            return state.boxSize
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
        setBoxSize(state, size) {
            if (typeof size != 'undefined') {
                state.boxSize = size;
            }
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
            commit('setBoxSize', payload.size);
        },
        // endPOp({ commit, dispatch }) {
        //     let msg = "行動已執行完成";

        //     dispatch('setStateBox', ({
        //         icon: 'info',
        //         msg: msg,
        //         status: 'confirm'
        //     }));
        //     setTimeout(() => {
        //         commit('closeBox');
        //     }, 1000)
        // },
    },
    modules: {}
}

export default store
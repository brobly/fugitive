const store = {
    state: {
        blackOn: false,
        openBox: ""
    },
    getters: {
        getBlackOn(state) {
            return state.blackOn
        },
        getBoxOn(state) {
            return state.openBox;
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
    },
    actions: {},
    modules: {}
}

export default store
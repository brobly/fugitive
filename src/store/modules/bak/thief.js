const store = {
    state: {
        thief_hand: [1, 2, 3, 42],
        thief_temp: {
            mainKey: null,
            subNo: [],
            speed: 0
        },
    },
    getters: {
        getThiefList(state) {
            return {
                thief_hand: state.thief_hand,
                thief_temp: state.thief_temp
            }
        },
    },
    mutations: {
        addThiefTemp(state, payload) {
            if (state.thief_temp.mainKey == null) {
                state.thief_temp.mainKey = payload.main;
            }
            if (typeof payload.sub != "undefined") {
                state.thief_temp.subNo.push(payload.sub);
                state.thief_temp.speed += state.speedList[payload.sub - 1];
            }
        },
        addThiefHand(state, array) {
            state.thief_hand = state.thief_hand.concat(array);
            state.thief_hand = state.thief_hand.sort((a, b) => a - b);
        },
        reduceThiefHand(state, num) {
            var index = state.thief_hand.indexOf(num);
            state.thief_hand.splice(index, 1);
        },
    },
    actions: {
        addThiefTemp({ commit }, payload) {
            commit('addThiefTemp', payload);
        },
        addThiefHand({ commit }, array) {
            commit('addThiefHand', array);
        },
    },
    modules: {}
}

export default store
function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
}
const store = {
    state: {
        deck1: [],
        deck2: [],
        deck3: [],
        whole: [],
        speedList: [],
        thief_hand: [1, 2, 3, 42],
        thief_temp: {
            mainKey: null,
            subNo: [],
            speed: 0
        },
        police_hand: [],
        police_temp: [],
        note: [],
        escape_list: [{
            "status": true,
            "main": 0,
            "sub": [],
            "speed": 0
        }]
    },
    getters: {
        getSpeedList(state) {
            return state.speedList
        },
        getDeck1(state) {
            return state.deck1
        },
        getDeck2(state) {
            return state.deck2
        },
        getDeck3(state) {
            return state.deck3
        },
        getWhole(state) {
            return state.whole
        },
        getEscapeList(state) {
            return state.escape_list
        },

    },
    mutations: {
        setSpeedList(state, random) {
            state.speedList.push(random);
        },
        initDeck(state) {
            state.deck1 = range(4, 14);
            state.deck2 = range(15, 28);
            state.deck3 = range(29, 41);
            state.whole = range(1, 41);
        }

    },
    actions: {
        initDeck({ commit, state }) {
            commit('initDeck');
            state.whole.forEach(function() {
                var random = Math.floor(Math.random() * 2) + 1;
                commit('setSpeedList', random);
            });
        }
    },
    modules: {}
}

export default store
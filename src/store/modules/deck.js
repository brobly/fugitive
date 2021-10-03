function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
}

import draw from "./drawCard.js"
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
        getThiefList(state) {
            return {
                thief_hand: state.thief_hand,
                thief_temp: state.thief_temp
            }
        },
        getPoliceList(state) {
            return {
                police_hand: state.police_hand,
                police_temp: state.police_temp,
            }
        },
        getEscapeLastNumber(state) {
            return state.escape_list[state.escape_list.length - 1].main
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
            state.speedList = [];
            state.thief_hand = [1, 2, 3, 42];
            state.police_hand = [];
            state.escape_list = [{
                "status": true,
                "main": 0,
                "speed": 0,
                "sub": []
            }];
        },

        initTempList(state) {
            state.thief_temp = {
                mainKey: null,
                subNo: [],
                speed: 0
            }
            state.police_temp = [];
        },
        addEscapeList(state, data) {
            state.escape_list.push(data);
        },
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
        changeEscapeList(state, array) {
            array.forEach(item => {
                state.escape_list[state.escape_list.indexOf(item)].status = true;
            });
        },

    },
    actions: {
        initDeck({ commit, state }) {
            commit('initDeck');
            state.whole.forEach(function() {
                var random = Math.floor(Math.random() * 2) + 1;
                commit('setSpeedList', random);
            });
            commit('initTempList');
            commit('deckDraw', {
                'hand': state.thief_hand,
                'num': 3,
                'item': state.deck1
            });
            commit('deckDraw', {
                'hand': state.thief_hand,
                'num': 2,
                'item': state.deck2
            });
            commit('deckDraw', {
                'hand': state.police_hand,
                'num': 2,
                'item': state.deck1
            });
        },
        addThiefTemp({ commit }, payload) {
            commit('addThiefTemp', payload);
        },
        addThiefHand({ commit }, array) {
            commit('addThiefHand', array);
        },
        addEscapeList({ commit }, data) {
            commit('addEscapeList', data);
        }
    },
    modules: { draw }
}

export default store
function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
}

import card from "./card.js"
const store = {
    state: {
        deck1: [],
        deck2: [],
        deck3: [],
        whole: [],
        speedList: [],
        thief_hand: [1, 2, 3, 42],
        thief_temp: {
            main: null,
            sub: [],
            speed: 0
        },
        police_hand: [],
        police_temp: [],
        escape_list: [{
            "status": true,
            "main": 0,
            "sub": [],
            "speed": 0
        }],
        crossList: [],
        currentTab: null,
    },
    getters: {
        getDeck1(state) {
            return state.deck1
        },
        getDeck2(state) {
            return state.deck2
        },
        getDeck3(state) {
            return state.deck3
        },
        getSpeedList(state) {
            return state.speedList
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
                police_temp: state.police_temp
            }
        },
        getEscapeList(state) {
            return state.escape_list
        },
        getEscapeLastNumber(state) {
            return state.escape_list[state.escape_list.length - 1].main
        },
        getPoliceCrossList(state) {
            return state.crossList
        },
        getFlippedLastNumber(state) {
            var flipped = state.escape_list.filter((item) => {
                return (item.status == true)
            });
            return flipped[flipped.length - 1].main;
        },
        getCurrentTab(state) {
            return state.currentTab
        }
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
            state.crossList = Array(42).fill().map(() => false);
        },
        initThifeTemp(state,type) {
            switch(type){
                case 'main':
                    state.thief_temp.main = null;
                break;
                case 'sub':
                    state.thief_temp.sub = [];
                break;
                default:
                    state.thief_temp = {
                        main: null,
                        sub: [],
                        speed: 0
                    }
            }

        },
        initPoliceTemp(state) {
            state.police_temp = Array(42).fill().map(() => false);
        },
        addEscapeList(state, data) {
            state.escape_list.push(data);
        },
        addThiefTemp(state, payload) {
            if (payload.main != undefined || payload.main != null) {
                state.thief_temp.main = payload.main;
            }
            if (typeof payload.sub !== "undefined") {
                state.thief_temp.sub.push(payload.sub);
                state.thief_temp.speed += state.speedList[payload.sub - 1];
            }
        },
        addThiefHand(state, array) {
            state.thief_hand = [...state.thief_hand, ...array];
            state.thief_hand = state.thief_hand.sort((a, b) => a - b);
        },
        reduceThiefHand(state, num) {
            var index = state.thief_hand.indexOf(num);
            state.thief_hand.splice(index, 1);
        },
        changeEscapeList(state, array) {
            let idx, main = state.escape_list.map(item => item.main);
            array.forEach((item) => {
                idx = main.indexOf(item);
                state.escape_list[idx].status = true;
            });
        },
        changeCurrentTab(state, idx) {
            if (idx) {
                state.currentTab = idx;
            } else {
                state.currentTab = null;
            }

        },
        changeDraged(state, id) {
            state.draged = id;
        },
        toggleJudge(state, idx) {
            const res = !state.police_temp[idx];
            state.police_temp.splice(idx, 1, res);
        },
        toggleCross(state, idx) {
            const res = !state.crossList[idx];
            state.crossList.splice(idx, 1, res);
        },
    },
    actions: {
        initDeck({ commit, state }) {
            commit('initDeck');
            state.whole.forEach(function() {
                var random = Math.floor(Math.random() * 2) + 1;
                commit('setSpeedList', random);
            });
            commit('initThifeTemp');
            commit('initPoliceTemp');
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
            state.police_hand.forEach(function(item) {
                commit('toggleCross', (item - 1));
            });
        },
        addEscapeList({ commit }, data) {
            commit('addEscapeList', data);
        },
        addThiefTemp({ commit }, payload) {
            commit('addThiefTemp', payload);
        },
        addThiefHand({ commit }, array) {
            commit('addThiefHand', array);
        },
        toggleJudge({ commit }, idx) {
            commit('toggleJudge', idx);
        },
        toggleCross({ commit }, idx) {
            commit('toggleCross', idx);
        },

    },
    modules: { card }
}

export default store
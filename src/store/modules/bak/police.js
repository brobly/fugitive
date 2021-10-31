const store = {
    state: {
        whole: [],
        speedList: [],
        police_hand: [],
        police_temp: [],
        crossList: [],
    },
    getters: {
        getWhole(state) {
            return state.whole
        },
        getSpeedList(state) {
            return state.speedList
        },
        getPoliceList(state) {
            return {
                police_hand: state.police_hand,
                police_temp: state.police_temp,
            }
        },
        getPoliceCrossList(state) {
            return state.crossList
        },
    },
    mutations: {
        setSpeedList(state, random) {
            state.speedList.push(random);
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
        toggleJudge({ commit }, idx) {
            commit('toggleJudge', idx);
        },
        toggleCross({ commit }, idx) {
            commit('toggleCross', idx);
        },
    },
    modules: {}
}

export default store
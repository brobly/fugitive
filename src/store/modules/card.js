const store = {
    state: {
        lastDraw: 0,
        dragedNum: 0,
        dragTarget: '',
        drgRect: '',
        mainDrp: '',
        subDrp: '',
    },
    getters:{
        getLastDraw(state) {
            return state.lastDraw;
        },
        getDragedNum(state) {
            return state.dragedNum;
        },
        getDragTarget(state) {
            return state.dragTarget;
        },
        getDrgRect(state) {
            return state.drgRect;
        },
        getMainDrp(state) {
            return state.mainDrp;
        },
        getSubDrp(state) {
            return state.subDrp;
        },
    },
    mutations: {
        deckDraw(state, { hand, num, item }) {
            for (let i = 0; i < num; i++) {
                const random = item[Math.floor(Math.random() * item.length)];
                item.splice(item.indexOf(random), 1);
                hand.push(random);
                hand = hand.sort((a, b) => a - b);
                state.lastDraw = random
            }
        },
        changeDragedNum(state, id) {
            state.dragedNum = id;
        },
        changeDragTarget(state, t) {
            state.dragTarget = t;
        },
        changeDrgRect(state, obj) {
            state.drgRect = obj;
        },
        changeMainDrp(state, t) {
            state.mainDrp = t;
        },
        changeSubDrp(state, t) {
            state.subDrp = t;
        },
    },
    actions: {},
    modules: {}
}

export default store
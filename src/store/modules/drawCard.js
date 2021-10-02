const store = {
    state: {

    },
    getters: {


    },
    mutations: {
        deckDraw(state, { hand, num, item }) {
            for (let i = 0; i < num; i++) {
                var random = item[Math.floor(Math.random() * item.length)];
                item.splice(item.indexOf(random), 1);
                hand.push(random);
                hand = hand.sort((a, b) => a - b);
            }
        }
    },
    actions: {

    },
    modules: {}
}

export default store
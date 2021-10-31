<template>
    <div class="deck-list">
        <div class="deck">
            <h4>04 - 14</h4>
            <card front='card-back'></card>
            <p>剩餘：<span>{{deck1.length}}</span>張</p>
        </div>
        <div class="deck">
            <h4>15 - 28</h4>
            <card front='card-back'></card>
            <p>剩餘：<span>{{deck2.length}}</span>張</p>
        </div>
        <div class="deck" style="border: 0px;">
            <h4>29 - 41</h4>
            <card front='card-back'></card>
            <p>剩餘：<span>{{deck3.length}}</span>張</p>
        </div>
    </div>
</template>


<script>
    import { mapGetters } from "vuex"
    import card from "../card.vue"
    export default {
        name: 'deckListVertical',
        data(){
            return{
            }
        },
        components:{
            card:card
        },
        computed:{
            ...mapGetters({
                deck1 :"getDeck1",
                deck2 :"getDeck2",
                deck3 :"getDeck3",
            })
        },
    }
</script>

<style lang="scss" scoped>
.deck-list {
  border: 1px solid #3f3f3f;
  width: auto;
  padding: 10px 20px;
  display: table;
}

.deck {
  border-bottom: 3px dashed #ccc;
  display: block;
  margin-bottom: 20px;

  &:last-child {
    border: 0px;
  }
}

.deck-list {
  h4 {
    text-align: center;
    font-size: 1.3rem;
    margin-bottom: 2px;
    width: 80px;
  }

  .card-wrapper {
    margin: 0 auto;
  }

  .deck p {
    font-size: 1rem;
    text-align: center;
  }
}

@media only screen and (max-width: 420px) {
  .deck-list{
    display: flex;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    padding: 5px 0px 0px;
    border: 0px;
    border-top: 3px dashed #ccc;
    .deck{
        border-bottom: 0px;
        display: block;
        margin-bottom: 0px;
        border-right: 3px dashed #ccc;
        width: 33%;
        h4{
          width:100%;
        }
        p{
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
    }
  }
}

</style>
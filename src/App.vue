<template>
  <div id="app">
      <div id="main" class="containBox">
          <topHeader></topHeader>
          <div id="l-body">
            <escapeArea></escapeArea>
          </div>
          <div class="floating-nav"> 
              <navItem @turn="turnBoxOn('hand')" icon="hand"></navItem>
              <navItem @turn="turnBoxOn('rule')" icon="manual"></navItem>
              <navItem v-if="role == 'police'" @turn="turnBoxOn('note')" icon="note"></navItem>
          </div>
      </div>
      <div v-show="blackOn" class="black-background"></div>
      <rule></rule>
      <hand></hand>
      <draw></draw>
      <note></note>
      <alertBox></alertBox>
  </div>
</template>

<script>
/* bug:
        (Not a bug) 1. drop card to sub and then drop card to main will reset hand
        (Done) 2. show escapeList detail and then end turn, the detail still appear
        (Done) 3. add last draw card to hand
        (Done) 4. draw a 0 card deck will draw a plain card
        (disappear ) 5. draw card always draw deck1
        (Done) 6. winning a round and then start again thief_first is false
        7. add 執行完成popup
        (Done) 8. police success to find escape location,but sub card not go to cross list
        9. 29 error
   css:
        1. box resizeing
        2. responsive 
*/
import topHeader from "./components/topHeader.vue"
import rule from "./components/rule.vue"
import hand from "./components/hand.vue"
import draw from "./components/draw.vue"
import note from "./components/note.vue"
import navItem from "./components/navItem.vue"
import alertBox from "./components/alert.vue"
import escapeArea from "./components/escape/escapeArea.vue"
import { mapGetters, mapMutations } from "vuex"

export default {
    name: 'App',
    components:{
        'topHeader' : topHeader,
        'rule' : rule,
        'hand' : hand,
        'draw' : draw,
        'note' : note,
        'navItem' : navItem,
        'alertBox' : alertBox,
        'escapeArea' : escapeArea
    },
    computed:{
        ...mapGetters({
            role : "getRole",
            blackOn : "getBlackOn",
            getSpeed : "getSpeedList",
        })
    },
    methods:{
        ...mapMutations({
            turnBoxOn : "turnBoxOn"
        })
    },
    mounted(){
      this.$store.dispatch('gameStart');
    }
}
</script>

<style lang="scss">
$color1 : #fff;
#main {
    width: 100%;
    height: 650px;
    display: block;
    padding-bottom: 5px;
    position: relative;
    box-shadow: 0px 0px 15px;
    padding-bottom: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-60%);
    background: $color1;
}
    .floating-nav{
        position: absolute;
        top: 120px;
        right: 20px;
        .nav-item{ 
            margin: 40px 10px;
            width: 55px;
            height: 55px;
        }
        .c-icon{
            width: 100%;
            height: 100%;
        }
    }

@media only screen and (max-width: 780px) {
    #main {
        width: calc(100% - 40px);
        height: 65%;
    }
}
</style>

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
          </div>
      </div>
      <div v-show="blackOn" class="black-background"></div>
      <rule></rule>
      <hand></hand>
    <draw></draw>
      <alertBox></alertBox>
  </div>
</template>

<script>
import topHeader from "./components/topHeader.vue"
import rule from "./components/rule.vue"
import hand from "./components/hand.vue"
import draw from "./components/draw.vue"
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
      this.$store.dispatch('initDeck');
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

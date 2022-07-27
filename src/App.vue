<template>
  <div id="app">
      <div id="main" class="containBox">
          <topHeader></topHeader>
          <div id="l-body">
            <escapeArea></escapeArea>
          </div>
          <div class="floating-nav"> 
              <navItem @turn="turnBoxOn('hand')" desc="行動頁面" icon="hand"/>
              <navItem @turn="turnBoxOn('rule')" desc="遊戲規則" icon="manual"/>
              <navItem @turn="turnBoxOn('note')" desc="神探第記" icon="note" v-if="role == 'police'"/>
          </div>
      </div>
      <div v-if="blackOn" class="black-background"></div>
      <rule></rule>
      <hand></hand>
      <draw></draw>
      <note></note>
      <alertBox></alertBox>
  </div>
</template>

<script>
import topHeader from "./components/topHeader.vue"
import navItem from "./components/navItem.vue"
import rule from "./components/rule.vue"
import hand from "./components/hand.vue"
import draw from "./components/draw.vue"
import note from "./components/note.vue"
import alertBox from "./components/alert.vue"
import escapeArea from "./components/escape/escapeArea.vue"
import { mapMutations, mapGetters } from "vuex"

export default {
    name: 'App',
    components:{
        topHeader,
        rule,
        hand,
        draw,
        note,
        navItem,
        alertBox,
        escapeArea
    },
    computed:{
        ...mapGetters({
            role : "getRole",
            blackOn : "getBlackOn"
        })
    },
    methods:{
        ...mapMutations({
            turnBoxOn : "turnBoxOn"
        })
    },
    beforeCreate(){
        this.$store.dispatch('gameReset');
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
        top: 7.5rem;
        right: 1.25rem;
    }

@media only screen and (max-width: 780px) {
    #main {
        width: calc(100% - 40px);
        height: 65%;
    }
}
@media only screen and (max-width: 420px) {
    #main {
        width: 100%;
        height: 100%;
        top:0px;
        left:0px;
        transform: translate(0px,0px);
    }
}
</style>

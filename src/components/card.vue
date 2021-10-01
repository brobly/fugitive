<!--
    1. 有4個地方會用到card (escapeList, deckListVertical, hand and draw)
    2. Hand and draw session have different clickable event
    3. Thife's hand session has drap and drop event
    4. v-blnd class "card-front / card-back" to "card-face" 
    5. v-bind class card-main / card-sub" and "is-flipped" to card
 -->
<template>
    <div class="card-wrapper">
        <a :id="('card-' + number)" class="card" :class="[main, flipped]" href="javascript:void(0)"
          >  
            <div class="card-face" :class="front">
                <template v-if="front == 'card-front'">
                  <div :class="{[('speed-') + foot] : foot}" class="speed-up full-bg"></div>
                  <div class="number-c">{{number}}</div>
                </template>
            </div>
            
        </a>
    </div>
</template>
<script>
    export default {
        name: 'card',
        data(){
            return{
            }
        },
        props:{
            number:Number,
            main:String,
            flipped:String,
            front:String,
            foot : Number
        },
        components:{
        },
        methods:{
        }
    }
</script>

<style lang="scss" scoped>
.card-wrapper {
  position: relative;
  width: 54px;
  height: 70px;
  margin: 0 8px;
  -webkit-perspective: 600px;
  perspective: 600px;
}

.card {
  /*border:2px solid #ccc;*/
  background-image: url(#{$assetPath}/border-gray.jpg);
  background-size: 100%;
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  border-radius: 0px;

  &.is-flipped {
    transform: rotateY(180deg);
  }
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 20px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.card-front {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.card-back {
  background-color: #00f;
  background: url(#{$assetPath}/logo.png) no-repeat center center;
  background-size: 120%;

  &:affter {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url(#{$assetPath}/border-gray.jpg);
    background-size: 100%;
  }
}

.speed-up {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 15px;
  height: 15px;
  opacity: 0.6;
  text-indent: -999px;
  font-size: 0px;
}

.speed-1 {
  background-image: url(#{$assetPath}/footprint-1.png);
}

.speed-2 {
  background-image: url(#{$assetPath}/footprint-2.png);
}

.number-c {
  text-align: center;
  font-size: 24px;
  padding-top: 23px;
}

.card-sub {
  margin-top: -115%;
  top: 61px;
}

.card {
  &.s-main {
    background-image: url(#{$assetPath}/border-gold.jpg);
  }

  &.s-sub {
    background-image: url(#{$assetPath}/border-silver.png);
  }
}
</style>
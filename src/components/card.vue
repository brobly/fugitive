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
          :draggable="draggable" @dragstart="dragStart" @dragover.stop
           @touchstart.stop="dragStart" @touchmove.stop="touchMove" @touchend="$emit('mobileEnd')">
            
            <div class="card-face" :class="front">
                <template v-if="front == 'card-front'">
                  <div :class="{[('speed-') + foot] : foot}" class="speed-up full-bg"></div>
                  <div class="number-c" :class="{ 'no-foot': ( number == 0 || number == 42)}">{{number}}</div>
                </template>
            </div>
            
        </a>
    </div>
</template>
<script>
    import { mapMutations, mapGetters} from "vuex"
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    export default {
        name: 'card',
        data(){
            return{
              cy :0
            }
        },
        props:{
            draggable: {
              type: Boolean,
              default: false
            },
            number:Number,
            main:String,
            flipped:String,
            front:String,
            foot : Number
        },
        components:{
        },
        computed:{
          ...mapGetters({
              dragTarget: 'getDragTarget'
          })
        },
        methods:{
          ...mapMutations({
              changeDragedNum : "changeDragedNum",
              changeDragTarget : "changeDragTarget",
              changeDrgRect : "changeDrgRect",
          }),
          dragStart:function(e){
            if(this.draggable){
              this.changeDragTarget(e.currentTarget);
              const id = this.dragTarget.id.slice(5);
              this.changeDragedNum(id);
              
              if(mobile){
                this.cy = 100;
                this.dragTarget.parentNode.style.position = "absolute";
                this.dragTarget.parentNode.style.zIndex = "2";
              }
            }
          },
          touchMove:function(e){
            
            if(this.draggable){
              let dragTarget = this.dragTarget;
              dragTarget.parentNode.style.left = e.touches[0].clientX - dragTarget.clientWidth  + "px";
              dragTarget.parentNode.style.top = e.touches[0].clientY - dragTarget.clientHeight - this.cy + "px";
              this.changeDrgRect(dragTarget.getBoundingClientRect());
            }
         }
        }
    }
</script>

<style lang="scss" scoped>
.card-wrapper {
  position: relative;
  width: 3.375rem;
  height: 4.375rem;
  margin: 0 0.5rem;
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
  width: 1rem;
  height: 1rem;
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
  font-size: 1.5rem;
  padding-top: 1.6rem;
  &.no-foot{
    padding-top: 1.5rem;
  }
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



@media only screen and (max-width: 420px) {

  .number-c {
    &.no-foot{
      padding-top: 1.3rem;
    }
  }
  .card-sub{
    top: 3.9rem;
  }
}
</style>
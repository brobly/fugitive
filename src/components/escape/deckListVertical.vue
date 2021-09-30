<template>
    <div class="deck-list">
        <div class="deck">
            <h4>04 - 14</h4>
            <div class="card-wrapper">
                <div class="card">
                  <div class="card-face card-back"></div>
                </div>
            </div>
            <p>剩餘：<span>6</span>張</p>
        </div>
        <div class="deck">
            <h4>15 - 28</h4>
            <div class="card-wrapper">
                <div class="card">
                  <div class="card-face card-back"></div>
                </div>
            </div>
            <p>剩餘：<span>12</span>張</p>
        </div>
        <div class="deck" style="border: 0px;">
            <h4>29 - 41</h4>
            <div class="card-wrapper">
                <div class="card">
                  <div class="card-face card-back"></div>
                </div>
            </div>
            <p>剩餘：<span>14</span>張</p>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'deckListVertical',
        data(){
            return{
            }
        },
        components:{
        },
        computed:{
           
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
    font-size: 22px;
    margin-bottom: 2px;
    width: 80px;
  }

  .card-wrapper {
    margin: 0 auto;
  }

  .deck p {
    font-size: 15px;
    text-align: center;
  }
}

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


</style>
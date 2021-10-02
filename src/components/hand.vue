
<template>
  <div v-show="handOn=='hand' " id="hand-box" class="box containBox">
       <a class="btn-close-box" 
       @click="closeBox" href="javascript:void(0)"></a>
        <div class="content">
            <div class="c-icon">
                <div class="c-icon__i c-icon__i--hand-img c-background--full"></div>
            </div>
            <p class="text-center">這是你的手牌</p>
            <!-- <div class="timer-wrapper">計時：<div class="timer">120s</div></div> -->
            <div class="state-text">
                <p>{{msg}}</p>
            </div>
            <div class="hand-list">
                <card v-for="item in thiefList.thief_hand" :key="('hand-' + item)"
                    flipped="is-flipped" front="card-front" 
                    :number="item" :foot="speedList[(item - 1)]"  :draggable="true">
                </card>
            </div>
            <div id="main-location-num" class="btn-group-wrap">
                <div class="btn-group">
                    <div>
                        <div id="main-location" class="droppable-block"
                            @dragover.prevent @drop.prevent="mainDrop"></div>
                        <p>藏身地點： <span>{{thiefList.thief_temp.mainKey}}</span></p>
                    </div>

                    <div>
                        <div id="sub-location" class="droppable-block"
                            @dragover.prevent @drop.prevent="subDrop"></div>
                        <p>搭配： <span>{{thiefList.thief_temp.subNo}}</span></p>
                    </div>
                </div>
            </div>
            
            <div class="btn-group-wrap">
                <div class="btn-group">
                    <button id="btn-card-action" class="btn btn-primary"
                        @click="thiefAction"
                    >執行</button>
                    <button id="btn-card-cancel" class="btn btn-primary"
                        @click="resetThiefAction"
                    >重選</button>
                </div>
            </div>
          

            <!--   <div class="progress-bar">
                <div id="game-bar" class="bar" ></div>
            </div> -->
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapMutations, mapActions } from "vuex"
    import card from "./card.vue"
    export default {
        name: 'hand',
        data(){
            return{
            }
        },
        props:{

        },
        components:{
            card: card
        },
        computed:{
            ...mapGetters({
                role:"getRole",
                handOn : "getBoxOn",
                speedList : "getSpeedList",
                thiefList : "getThiefList",
                policeList : "getPoliceList",
                escape_list : "getEscapeList",
                escape_list_last : "getEscapeLastNumber"
            }),
            rush_range(){
                return this.escape_list_last + 3 + this.thiefList.thief_temp.speed
            },
            msg (){
                return "請選擇及拖放" + (this.escape_list_last + 1) + "-" + this.rush_range +"你的藏身地點"
            }
        },
        methods:{
            ...mapMutations({
                closeBox : "closeBox",
                reduceThiefHand  : "reduceThiefHand",
                initTempList : "initTempList",
            }),
            ...mapActions({
                addThiefTemp : "addThiefTemp",
                addThiefHand : "addThiefHand"
            }),
            mainDrop: function(e){
                const card_id = e.dataTransfer.getData('card_id'),
                      mainKey = parseInt(card_id.slice(5)),
                      rush_range = this.rush_range;
                      
                if(mainKey == 42 && rush_range < 42 ){
                    this.msg = "你還不能選擇42卡牌!";
                }else{
                    if(mainKey > this.escape_list_last){
                        this.resetThiefAction();
                        this.addThiefTemp({'main':mainKey});
                        this.reduceThiefHand(mainKey);
                    }else{
                        this.msg = "你不能選擇比已打出的牌數字更少的牌作藏身地點!"
                    }
                }
            },
            subDrop: function(e){
                const card_id = e.dataTransfer.getData('card_id'),
                      subKey = parseInt(card_id.slice(5));
                if(subKey != 42){
                    this.addThiefTemp({'sub':subKey});
                    this.reduceThiefHand(subKey);
                }else{
                    this.msg = "你不能選擇42卡牌作搭配路線!"
                }
            },
            resetThiefAction : function(){
            },
            thiefAction: function(){

            }
        }
    }
</script>

<style lang="scss" scoped>

    .hand-list{
        display: inline-block;
        .card-wrapper{
            float:left;
            margin-bottom: 10px;
        }
    }

    
    #main-location{
        background-image: url(#{$assetPath}/pangyan10jpg.jpg);
    }
    #sub-location{
        background-image: url(#{$assetPath}/man-human-002-512.png);
    }
    .droppable-block{
        width: 100px;
        height:80px;
        margin: 0 20px 5px;
        background-position: center;
        background-size: 100% 100%;
        background-repeat: no-repeat; 

    }
</style>
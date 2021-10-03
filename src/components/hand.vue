
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
            <template v-if="role=='thief'">
                <div class="state-text">
                    <p>請選擇及拖放{{ (escape_list_last + 1) }} - {{rush_range}}你的藏身地點</p>
                </div>
                <div class="hand-list">
                    <card v-for="item in thiefList.thief_hand" :key="('hand-' + item)"
                        flipped="is-flipped" front="card-front" 
                        :number="item" :foot="speedList[(item - 1)]"  :draggable="draggable">
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
                        <button id="btn-card-action" :class="{'disabled': disabled}" class="btn btn-primary"
                            @click="thiefAction"
                        >執行</button>
                        <button id="btn-card-cancel" :class="{'disabled': disabled}" class="btn btn-primary"
                            @click="resetThiefAction"
                        >重選</button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="state-text">
                    <p>點擊已揭曉的地點能顯示該地點的全部號碼</p>
                </div>
                <div class="hand-list">
                    <card v-for="item in policeList.police_hand" :key="('hand-' + item)"
                        flipped="is-flipped" front="card-front" 
                        :number="item" :foot="speedList[(item - 1)]" >
                    </card>
                </div>
                <div class="btn-group-wrap">
                    <div class="btn-group">
                        <button id="btn-card-action" :class="{'disabled': disabled}" class="btn btn-primary"
                            @click="policeAction"
                        >執行</button>
                        <button id="btn-card-cancel" :class="{'disabled': disabled}" class="btn btn-primary"
                            @click="initTempList"
                        >重選</button>
                    </div>
                </div>
            </template>
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
                escape_list_last : "getEscapeLastNumber",
                disabled : "getDisable",
                draggable : "getDraggable",
            }),
            rush_range(){
                return this.escape_list_last + 3 + this.thiefList.thief_temp.speed
            }
        },
        methods:{
            ...mapMutations({
                closeBox : "closeBox",
                reduceThiefHand  : "reduceThiefHand",
                initTempList : "initTempList",
                changeDisabled : "changeDisabled",
                changeDraggable : "changeDraggable",
            }),
            ...mapActions({
                addThiefTemp : "addThiefTemp",
                addThiefHand : "addThiefHand",
                addEscapeList : "addEscapeList",
                setStateBox :"setStateBox",
            }),
            mainDrop: function(e){
                let msg = "";
                const card_id = e.dataTransfer.getData('card_id'),
                      mainKey = parseInt(card_id.slice(5)),
                      rush_range = this.rush_range;
                      
                if(mainKey == 42 && rush_range < 42 ){
                    msg = "你還不能選擇42卡牌!";
                    this.setStateBox({   
                        icon :'error',
                        msg : msg , 
                        status: 'normal'
                    });
                }else{
                    if(mainKey > this.escape_list_last){
                        this.resetThiefAction();
                        this.addThiefTemp({'main':mainKey});
                        this.reduceThiefHand(mainKey);
                    }else{
                        msg = "你不能選擇比已打出的牌數字更少的牌作藏身地點!"
                        this.setStateBox({   
                            icon :'error',
                            msg : msg , 
                            status: 'normal'
                        });
                    }
                }
            },
            subDrop: function(e){
                let msg = "";
                const card_id = e.dataTransfer.getData('card_id'),
                      subKey = parseInt(card_id.slice(5));
                if(subKey != 42){
                    this.addThiefTemp({'sub':subKey});
                    this.reduceThiefHand(subKey);
                }else{
                    msg = "你不能選擇42卡牌作搭配路線!"
                    this.setStateBox({   
                        icon :'error',
                        msg : msg , 
                        status: 'normal'
                    });
                }
            },
            resetThiefAction : function(){
                let main = this.thiefList.thief_temp.mainKey,
                    sub = this.thiefList.thief_temp.subNo,
                    arr = sub;

                if(main != null){
                    arr = sub.concat(main);
                }
                this.addThiefHand(arr);
                this.initTempList();
            },
            thiefAction: function(){
                let thief_temp = this.thiefList.thief_temp,
                    msg;
                let data = {
                        status: false,
                        main: thief_temp.mainKey,
                        sub: thief_temp.subNo,
                        speed: thief_temp.speed
                    }
                
                if(data.main <= this.rush_range){
                    this.addEscapeList(data);
                    this.initTempList();

                    if(data.main == 42){
                            msg = "恭喜你！你已經逃離神探的追捕!";
                            this.setStateBox({   
                                icon :'winning',
                                msg : msg , 
                                status: 'win'
                            });
                    }else if(data.main <= 41){
                        this.changeDisabled();
                        this.closeBox();
                        this.changeDraggable();
                    }
                }else{
                        msg = '你沒有選擇足夠距離的牌以達到藏身地點';
                        this.setStateBox({   
                            icon :'error',
                            msg : msg , 
                            status: 'normal'
                        });
                }

            },
            policeAction: function(){

            },
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
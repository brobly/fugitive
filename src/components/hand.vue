
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
            <span class="hand-last-draw" v-if="!firstRound">你剛抽到第{{lastDraw}}號卡牌</span>
            <template v-if="role=='thief'">
                <div class="state-text">
                    <template v-if="!endOn">
                        <p v-if="!thiefFirst">第1回合可選擇多一個藏身地點，請選擇{{ (escape_list_last + 1) }} - {{rush_range}}號的牌</p>
                        <p v-else >請選擇及拖放{{ (escape_list_last + 1) }} - {{rush_range}}你的藏身地點</p>
                    </template>
                    <p v-else>你已經選擇了藏身地點，請你結束回合</p>
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
                <button id='btn-show-cross' @click="toggleShowCross" class='btn btn-primary'>過濾</button>
                <div class="state-text">
                    <p>點擊已揭曉的地點能顯示該地點的全部號碼</p>
                </div>
                
                <div class="hand-list">
                    <card v-for="item in policeList.police_hand" :key="('hand-' + item)"
                        flipped="is-flipped" front="card-front" 
                        :number="item" :foot="speedList[(item - 1)]" >
                    </card>
                </div>
                <div class="card-table">
                    <p v-if="endOn" colspan="6">你己經選擇了調查地點</p>
                    <p v-else colspan="6">請選擇一個或以上要調查的藏身地點</p>
                    <div :class="{'disabled': disabled}" class="police-table police-selet">
                        <div  v-for="(i,index) in policeList.police_temp" :key="('police-select' + index)" 
                        class="police-table-item" @click="toggleJudge( index )"
                            :class="[{'judge': i}, {'cross': (showCross && crossList[index])}]">
                                {{index + 1}}
                        </div>
                    </div>
                </div>
                <div class="btn-group-wrap" style="margin-top: 20px;">
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
                showCross : true
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
                endOn : "getEndOn", 
                handOn : "getBoxOn",
                speedList : "getSpeedList",
                thiefList : "getThiefList",
                policeList : "getPoliceList",
                escape_list : "getEscapeList",
                escape_list_last : "getEscapeLastNumber",
                disabled : "getDisable",
                draggable : "getDraggable",
                thiefFirst : "getThiefFirst",
                flipped_last : "getFlippedLastNumber",
                crossList : "getPoliceCrossList",
                firstRound : "getFirstRound",
                lastDraw : "getLastDraw"
            }),
            rush_range(){
                return this.escape_list_last + 3 + this.thiefList.thief_temp.speed
            }
        },
        methods:{
            ...mapMutations({
                closeBox : "closeBox",
                clearPrev : "clearPrev",
                reduceThiefHand  : "reduceThiefHand",
                initTempList : "initTempList",
                changeRole : "changeRole",
                changeDisabled : "changeDisabled",
                changeDraggable : "changeDraggable",
                changeThiefFirst : "changeThiefFirst",
                changeEscapeList : "changeEscapeList",
                turnEndOn : "turnEndOn"
            }),
            ...mapActions({
                addThiefTemp : "addThiefTemp",
                addThiefHand : "addThiefHand",
                addEscapeList : "addEscapeList",
                setStateBox :"setStateBox",
                thiefEnd : "thiefEnd",
                toggleJudge : "toggleJudge",
                toggleCross : "toggleCross",
                // endPOp :"endPOp"

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
            thiefAction : function(){
                let pass, 
                    thief_temp = this.thiefList.thief_temp,
                    msg;

                if (thief_temp.mainKey != null)
                    pass = false;
                else
                    pass = true;

                if (pass == false) {
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
                            if(this.flipped_last >= 29){
                                msg = "恭喜你！你已經逃離神探的追捕!";
                                this.setStateBox({   
                                    icon :'winning',
                                    msg : msg , 
                                    status: 'win'
                                });
                            }else{
                                this.changeRole("police");
                                msg = `逃亡者已經到達42號藏身地點，但你還沒調查出29號或以上地點
                                所以遊戲繼續直至你猜錯或調查出所有藏身地點得以勝利!!`;
                                this.setStateBox({   
                                    icon :'info',
                                    msg : msg , 
                                    status: 'normal'
                                });
                            }
                        }else if(data.main <= 41){
                            
                            if(this.thiefFirst){
                                this.changeThiefFirst();
                            }else{
                                this.thiefEnd();
                                // this.endPOp();
                            }
                        }
                    }else{
                          msg = '你沒有選擇足夠距離的牌以達到藏身地點';
                            this.setStateBox({   
                                icon :'error',
                                msg : msg , 
                                status: 'normal'
                            });
                    }

                }else{
                    if (this.escape_list.length > 1) {
                        msg = "你沒有選擇藏身地點，請問這回合要Pass嗎?"
                        this.setStateBox({   
                            icon :'info',
                            msg : msg , 
                            status: 'pass'
                        });
                    } else {
                        msg = "你沒有選擇藏身地點"
                        this.setStateBox({   
                            icon :'error',
                            msg : msg , 
                            status: 'normal'
                        });
                    }
                }
            },
            policeAction : function(){
                let police_temp = this.policeList.police_temp,
                    escape_list = this.escape_list,
                    escape_main = escape_list.map( item => item.main),
                    count = 0,
                    msg,
                    hasTrue = police_temp.some((item) => {
                        return item == true;
                    }),
                    judge = [];

                    police_temp.forEach((item,index) => {
                        if(item)
                            judge.push(index+1)
                    });

                if (hasTrue) {
                    this.turnEndOn();
                    this.changeDisabled();
                    if (judge.every(val => escape_main.includes(val))) {
                        this.changeEscapeList(judge)
                        escape_list.forEach(function(item) {
                            if(item.status)
                                count++
                        });
                        if(count == escape_list.length){
                             msg = "恭喜你！你已經完全找出逃亡者的藏身地點!";
                              this.setStateBox({   
                                icon :'winning',
                                msg : msg , 
                                status: 'win'
                            });
                        }else{
                            msg = "太好了！你調查出逃亡者的藏身地點了";
                              this.setStateBox({   
                                icon :'info',
                                msg : msg , 
                                status: 'normal'
                            });
                        }
                        
                        judge.forEach((item) => {
                            let target = escape_list[escape_main.indexOf(item)];
                            this.toggleCross(target.main -1);
                            target.sub.forEach((num) => { 
                                this.toggleCross(num-1);
                            });
                        });
                    }else{
                        msg = "真可借！你這次沒有找出逃亡者的藏身地點";
                            this.setStateBox({   
                            icon :'info',
                            msg : msg , 
                            status: 'normal'
                        });
                    }
                    this.clearPrev();
                    
                } else {
                    msg = "你沒有選擇藏身地點"
                    this.setStateBox({   
                        icon :'error',
                        msg : msg , 
                        status: 'normal'
                    });
                }
                judge.forEach((item) => {
                    this.toggleJudge(item-1);
                });
            },
            toggleShowCross: function(){
                this.showCross = !this.showCross
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
    #btn-show-cross {
        position: absolute;
        right: 35px;
        top: 65px;
    }
    .hand-last-draw{
        position: absolute;
        right: 35px;
        top: 52px;
    }
</style>
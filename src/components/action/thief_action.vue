
<template>
    <div>
        <div class="state-text">
            <template v-if="!endOn">
                <p v-if="!thiefFirst">第1回合可選擇多一個藏身地點，請選擇{{ (escape_list_last + 1) }} - {{rush_range}}號的牌</p>
                <p v-else >請選擇{{ (escape_list_last + 1) }} - {{rush_range}}號其中之一的牌，拖放至藏身地點</p>
            </template>
            <p v-else>你已經選擇了藏身地點，請你結束回合</p>
        </div>
        <div class="hand-list">
            <card v-for="item in thiefList.thief_hand" :key="('hand-' + item)"
                flipped="is-flipped" front="card-front" 
                :number="item" :foot="speedList[(item - 1)]" :draggable="draggable"
                @mobileEnd ="touchEnd">
            </card>
        </div>
        <div id="main-location-num" class="btn-group-wrap">
            <div class="btn-group">
                <div>
                    <div ref="main" id="main-location" class="droppable-block"
                    @dragover.prevent @drop.prevent="mainDrop"></div>
                    <p>藏身地點： <span>{{thiefList.thief_temp.main}}</span></p>
                </div>

                <div>
                    <div ref="sub" id="sub-location" class="droppable-block"
                    @dragover.prevent @drop.prevent="subDrop"></div>
                    <p>搭配加速： <span>{{thiefList.thief_temp.sub}}</span></p>
                </div>
            </div>
        </div>
        
        <div class="btn-group-wrap">
            <div class="btn-group">
                <button id="btn-card-action" :class="{invalid}" class="btn btn-primary"
                    @click="thiefAction"
                >執行</button>
                <button id="btn-card-cancel" :class="{invalid}" class="btn btn-primary"
                    @click="resetThiefAction"
                >重選</button>
            </div>
        </div>
    </div>
</template>
                
<script>

    import { mapGetters, mapMutations, mapActions } from "vuex"
    import card from "../card.vue"
    export default {
        name: 'thiefAction',
        data(){
            return{
            }
        },
        components:{
            card,
        },
        computed:{
            ...mapGetters({
                role:"getRole",
                endOn : "getEndOn",
                speedList : "getSpeedList",
                thiefList : "getThiefList",
                escape_list : "getEscapeList",
                escape_list_last : "getEscapeLastNumber",
                flipped_last : "getFlippedLastNumber",
                invalid : "getInvalid",
                firstRound : "getFirstRound",
                thiefFirst : "getThiefFirst",
                lastDraw : "getLastDraw",
                draggable : "getDraggable",
                dragedNum : "getDragedNum",
                dragTarget : "getDragTarget",
                drgRect: "getDrgRect",
                mainDrp: "getMainDrp",
                subDrp: "getSubDrp",
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
                initThifeTemp : "initThifeTemp",
                changeRole : "changeRole",
                changeInvalid : "changeInvalid",
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
                // endPOp :"endPOp"
            }),
            resetThiefAction : function(){
                const {thiefList, addThiefHand, initThifeTemp} = this
                const main = thiefList.thief_temp.main,
                      sub = thiefList.thief_temp.sub
                let card = sub;
                if(main !=null) card=[...sub, main];

                addThiefHand(card);
                initThifeTemp();
            },
            mainDrop: function(){
                const {dragedNum, rush_range, 
                thiefList, setStateBox, addThiefHand, 
                escape_list_last, addThiefTemp, initThifeTemp, reduceThiefHand} = this
                
                const newMain = parseInt(dragedNum)
                let msg;
                    

                if(newMain == 42 && rush_range < 42 ){
                    msg = "你還不能選擇42卡牌!";
                    setStateBox({   
                        icon :'error',
                        msg : msg , 
                        status: 'normal',
                        size : 'small'
                    });
                    return
                }

                if(newMain < escape_list_last){
                    msg = "你不能選擇比已打出的牌數字更少的牌作藏身地點!"
                    setStateBox({   
                        icon :'error',
                        msg : msg , 
                        status: 'normal',
                        size : 'medium'
                    });
                    return
                }
                const currMain = thiefList.thief_temp.main

                if( currMain !== null){
                    addThiefHand([currMain]);
                    initThifeTemp('main')
                }
                addThiefTemp({'main':newMain});
                reduceThiefHand(newMain);
            },
            subDrop: function(){
                const {dragedNum, setStateBox, addThiefTemp, reduceThiefHand} = this
                const newSub = parseInt(dragedNum);
                
                if(newSub != 42){
                    addThiefTemp({'sub':newSub});
                    reduceThiefHand(newSub);
                    return
                }

                let msg = "你不能選擇42卡牌作搭配路線!"
                setStateBox({   
                    icon :'error',
                    msg : msg , 
                    status: 'normal',
                    size : 'small'
                });
                
            },
            touchEnd:function(){
                const {draggable, drgRect, dragTarget, mainDrop, subDrop} = this

                if(draggable){
                    let mainDrp = this.$refs.main.getBoundingClientRect(),
                        subDrp  = this.$refs.sub.getBoundingClientRect()
                        
                    if ((mainDrp.top   < drgRect.top &&
                        mainDrp.left   < drgRect.left &&
                        mainDrp.bottom > drgRect.bottom &&
                        mainDrp.right  > drgRect.right)) {
                            mainDrop();
                    }else if ((
                            subDrp.top    < drgRect.top &&
                            subDrp.left   < drgRect.left &&
                            subDrp.bottom > drgRect.bottom &&
                            subDrp.right  > drgRect.right)){
                            subDrop();
                    }

                    dragTarget.parentNode.style.position = "";
                    dragTarget.parentNode.style.zIndex = "";
                    dragTarget.parentNode.style.left = "";
                    dragTarget.parentNode.style.top = "";
                }
            },
            thiefAction : function(){
                const {thiefList, addEscapeList, initThifeTemp, setStateBox, escape_list, 
                flipped_last, rush_range, thiefFirst, changeThiefFirst, thiefEnd} = this

                let thief_temp = thiefList.thief_temp,
                    msg;

                // 判斷是否有打出藏身地點
                if (thief_temp.main != null) {
                    let data = {
                            status: false,
                            ...thief_temp
                        }
                    
                    if(data.main <= rush_range){
                        addEscapeList(data);
                        initThifeTemp(false);

                        //判斷遊戲結束
                        if(data.main == 42){

                            // 檢查是否勝利或進行特殊模式
                            if(flipped_last >= 29){
                                msg = "恭喜你！你已經逃離神探的追捕!";
                                setStateBox({   
                                    icon :'winning',
                                    msg : msg , 
                                    status: 'win',
                                    size : 'small'
                                });
                            }else{
                                msg = `您雖然已經到達42號藏身地點，但神探還沒調查出29號或以上地點
                                所以遊戲繼續直至神探猜錯或調查出所有藏身地點時神探將會勝利!!`;
                                setStateBox({   
                                    icon :'info',
                                    msg : msg , 
                                    status: 'special'
                                });
                            }
                        }else if(data.main <= 41){
                        //正常遊戲流程
                            if(thiefFirst){
                                msg = `第1回合可選擇多一個藏身地點，請繼續`;
                                setStateBox({   
                                    icon :'success',
                                    msg : msg , 
                                    status: 'normal',
                                    size : 'medium'
                                });
                                changeThiefFirst();
                            }else{
                                thiefEnd();
                                // this.endPOp();
                            }
                        }
                    }else{
                          msg = '你沒有選擇足夠距離的牌以達到藏身地點';
                            setStateBox({   
                                icon :'error',
                                msg : msg , 
                                status: 'normal',
                                size : 'medium'
                            });
                    }

                }else{
                    if (escape_list.length > 1) {
                        msg = "你沒有選擇藏身地點，請問這回合要Pass嗎?"
                        setStateBox({   
                            icon :'info',
                            msg : msg , 
                            status: 'pass',
                            size : 'medium'
                        });
                    } else {
                        //第一次一定要選擇藏身地點
                        msg = "你沒有選擇藏身地點"
                        setStateBox({   
                            icon :'error',
                            msg : msg , 
                            status: 'normal',
                            size : 'small'
                        });
                    }
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
    #main-location{
        background-image: url(#{$assetPath}/pangyan10jpg.jpg);
    }
    #sub-location{
        background-image: url(#{$assetPath}/man-human-002-512.png);
    }
    .droppable-block{
        width: 6.25rem;
        height: 5rem;
        margin: 0 20px 5px;
        background-position: center;
        background-size: 100% 100%;
        background-repeat: no-repeat; 
    }
    @media only screen and (max-width: 420px) {
        .droppable-block{
            width: 7.25rem;
            height: 5.5rem;
            margin: 0 0.625rem 0.3125rem;
        }
    }
</style>
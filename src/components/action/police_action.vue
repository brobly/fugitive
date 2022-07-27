<template>
    <div>
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
            <div :class="{invalid}" class="police-table police-selet">
                <div v-for="(i,index) in policeList.police_temp" :key="('police-select' + index)" 
                class="police-table-item" @click="toggleJudge( index )"
                    :class="[{'judge': i}, {'cross': (showCross && crossList[index])}]">
                        {{index + 1}}
                </div>
            </div>
        </div>
        <div class="btn-group-wrap" style="margin-top: 20px;">
            <div class="btn-group">
                <button id="btn-card-action" :class="{invalid}" class="btn btn-primary"
                    @click="policeAction"
                >執行</button>
                <button id="btn-card-cancel" :class="{invalid}" class="btn btn-primary"
                    @click="initPoliceTemp"
                >重選</button>
            </div>
        </div>
    </div>
</template>    
<script>

    import { mapGetters, mapMutations, mapActions } from "vuex"
    import card from "../card.vue"
    export default {
        name: 'policeAction',
        data(){
            return{
                showCross : true,
            }
        },
        components:{
            card,
        },
        computed:{
            ...mapGetters({
                role:"getRole",
                endOn : "getEndOn",
                policeList : "getPoliceList",
                speedList : "getSpeedList",
                escape_list : "getEscapeList",
                invalid : "getInvalid",
                crossList : "getPoliceCrossList"
            })
        },
        methods:{
            ...mapMutations({
                clearPrev : "clearPrev",
                initPoliceTemp : "initPoliceTemp",
                changeRole : "changeRole",
                changeInvalid : "changeInvalid",
                changeEscapeList : "changeEscapeList",
                turnEndOn : "turnEndOn"
            }),
            ...mapActions({
                setStateBox :"setStateBox",
                toggleJudge : "toggleJudge",
                toggleCross : "toggleCross",
            }),
            
            policeAction : function(){
                const {policeList, escape_list, special, turnEndOn, changeInvalid, 
                changeEscapeList, setStateBox, clearPrev, toggleCross, changeRole, toggleJudge} = this
                let police_temp = policeList.police_temp,
                    escape_main = escape_list.map( item => item.main),
                    count = 0,
                    msg,
                    hasTrue = police_temp.some(item => item == true),
                    judge = [];

                    police_temp.forEach((item,index) => {
                        if(item)
                            judge.push(index+1)
                    });

                if (hasTrue) {
                    if(!special){
                        turnEndOn();
                        changeInvalid();
                    }
                    if (judge.every(val => escape_main.includes(val))) {
                        changeEscapeList(judge)
                        escape_list.forEach(function(item) {
                            if(item.status)
                                count++
                        });


                        if(count == escape_list.length){
                             msg = "恭喜你！你已經完全找出逃亡者的藏身地點!";
                              setStateBox({   
                                icon :'winning',
                                msg : msg , 
                                status: 'win',
                                size : 'medium'
                            });
                            clearPrev();
                        }else{
                            if(special){
                                let msg;
                                msg = "神探還可繼續調查，但是一旦錯誤就逃亡者勝利"
                                setStateBox({
                                    icon: 'info',
                                    msg: msg,
                                    status: 'normal',
                                    size: "medium"
                                });
                            }else{
                                msg = "太好了！你調查出逃亡者的藏身地點了";
                                setStateBox({   
                                    icon :'success',
                                    msg : msg , 
                                    status: 'normal',
                                    size : 'medium'
                                });
                                clearPrev();
                            }
                        }
                        
                        judge.forEach((item) => {
                            let target = escape_list[escape_main.indexOf(item)];
                            toggleCross(target.main -1);
                            target.sub.forEach((num) => { 
                                toggleCross(num-1);
                            });
                        });
                    }else{
                        if(!special){
                            msg = "真可借！你這次沒有找出逃亡者的藏身地點";
                                setStateBox({   
                                icon :'info',
                                msg : msg , 
                                status: 'normal',
                                size : 'medium'
                            });
                            clearPrev();
                        }else{
                            changeRole("thief")
                            msg = "恭喜你！逃亡者。你已經逃離神探的追捕!";
                            setStateBox({   
                                icon :'winning',
                                msg : msg , 
                                status: 'win',
                                size : 'medium'
                            });
                        }
                    }
                    
                } else {
                    msg = "你沒有選擇藏身地點"
                    setStateBox({   
                        icon :'error',
                        msg : msg , 
                        status: 'normal',
                        size : 'small'
                    });
                }
                judge.forEach((item) => {
                    toggleJudge(item-1);
                });
            },
            toggleShowCross: function(){
                this.showCross = !this.showCross
            }
        }
    }

</script>


<style lang="scss" scoped>
    #btn-show-cross {
        position: absolute;
        right: 35px;
        top: 65px;
    }
</style>
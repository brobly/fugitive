
<template>
  <div v-show="drawOn=='draw' " id="draw-box" class="box containBox">
       <a class="btn-close-box" 
       @click="closeBox" href="javascript:void(0)"></a>
        <div class="content">
            <div class="c-icon">
                <div class="c-icon__i c-icon__i--draw-img c-background--full"></div>
            </div>
            <p v-if="enemyDraw != 0" id="enemy-draw">對方抽了第{{enemyDraw}}組牌庫</p>

            <div class="state-text">
                <p>請選擇以下牌組以抽取一張藏身地點卡</p>
            </div>
            <div class="draw-list">
                <a array="1" class="draw-deck" @click="decktoHand($event,deck1)"
                 :class="{'disabled': drawDisable1}" href="javascript:void(0)">
                    <h4>04 - 14</h4>
                    <card front='card-back'></card>
                    <p>剩餘：<span>{{deck1.length}}</span>張</p>
                </a>
                <a array="2" class="draw-deck" @click="decktoHand($event,deck2)" 
                 :class="{'disabled': drawDisable2}" href="javascript:void(0)">
                    <h4>15 - 28</h4>
                    <card front='card-back'></card>
                    <p>剩餘：<span>{{deck2.length}}</span>張</p>
                </a>
                <a array="3" class="draw-deck" @click="decktoHand($event,deck3)" 
                 :class="{'disabled': drawDisable3}" href="javascript:void(0)">
                    <h4>29 - 41</h4>
                    <card front='card-back'></card>
                    <p>剩餘：<span>{{deck3.length}}</span>張</p>
                </a>
            </div>
            
            <div v-if="role == 'thief'" >
                <p id="thief-hand-list">你的手牌:{{thief_list.thief_hand}}</p>
                <p id="thief-last-card">你最後打出的藏身地點為: {{escape_list_last}}</p> 
            </div>
            <div v-else>
                <p>逃亡者手牌剩餘 {{ thief_hand.length }} 張</p>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from "vuex"
    import card from "./card.vue"
    export default {
        name: 'draw',
        data(){
            return{
                enemyDraw : 0,
                drawDisable1 : false,
                drawDisable2 : false,
                drawDisable3 : false
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
                drawOn : "getBoxOn",
                deck1 :"getDeck1",
                deck2 :"getDeck2",
                deck3 :"getDeck3",
                thief_list : "getThiefList",
                police_list : "getPoliceList",
                escape_list_last : "getEscapeLastNumber",

            })
        },
        methods:{
            ...mapMutations({
                deckDraw : "deckDraw",
                closeBox : "closeBox"
            }),
            decktoHand:function(e,item){
                let hand;
                if(this.role == "thief"){
                    hand = this.thief_list.thief_hand;
                }else{
                    hand = this.police_list.police_hand;
                }
                this.enemyDraw = e.target.getAttribute('array');
                this.deckDraw( hand, 1, item);
                if(item.length == 1){
                    switch(this.enemyDraw){
                        case 1:
                           this.drawDisable1 = true;
                        break; 
                        case 2:
                           this.drawDisable2 = true;
                        break; 
                        case 3:
                           this.drawDisable3 = true;
                        break; 
                    }
                }
                this.closeBox();
            }
        }
    }
</script>



<style lang="scss" scoped>
    #enemy-draw{
        position: absolute;
        left: 43px;
        top: 60px;

    }
    .draw-list{
      display: flex;
    }
    .draw-deck {
        border: 5px solid;
        padding: 20px 20px;
        display: block;
        margin: 10px 20px 50px;
        max-width: 140px;
        &:hover{
            border-color:#007bff;
            box-shadow: 0px 0px 10px;
        }
        .card-wrapper{
            margin: 0 auto;
        }
        p {
            margin-top: 8px;
            margin-bottom: 0px;
            min-width: 90px;
            text-align: center;
        }
    }
</style>
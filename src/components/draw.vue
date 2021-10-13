
<template>
  <div v-show="drawOn=='draw' " id="draw-box" class="box containBox">
        <div class="content">
            <div class="c-icon">
                <div class="c-icon__i c-icon__i--draw-img c-background--full"></div>
            </div>
            <p v-if="enemyDraw != 0" id="enemy-draw">對方抽了第{{enemyDraw}}組牌庫</p>

            <div class="state-text">
                <p>請選擇以下牌組以抽取一張藏身地點卡</p>
            </div>
            <div class="draw-list">
                <a id="deck1" class="draw-deck" @click="decktoHand($event,deck1)"
                 :class="{'deskDisabled': drawDisable1}">
                    <h4>04 - 14</h4>
                    <card front='card-back'></card>
                    <p>剩餘：<span>{{deck1.length}}</span>張</p>
                </a>
                <a id="deck2" class="draw-deck" @click="decktoHand($event, deck2)" 
                 :class="{'deskDisabled': drawDisable2}">
                    <h4>15 - 28</h4>
                    <card front='card-back'></card>
                    <p>剩餘：<span>{{deck2.length}}</span>張</p>
                </a>
                <a id="deck3" class="draw-deck" @click="decktoHand($event, deck3)" 
                 :class="{'deskDisabled': drawDisable3}">
                    <h4>29 - 41</h4>
                    <card front='card-back'></card>
                    <p>剩餘：<span>{{deck3.length}}</span>張</p>
                </a>
            </div>
            <p v-if="role == 'thief'" id="thief-hand-list">你的手牌:{{thief_list.thief_hand}}</p>
            <p v-else id="police-hand-list">你的手牌:{{police_list.police_hand}}</p>

            <div v-if="role == 'thief'" >
                <p id="thief-last-card">你最後打出的藏身地點為: {{escape_list_last}}</p> 
            </div>
            <div v-else>
                <p>逃亡者手牌剩餘 {{ thief_list.thief_hand.length }} 張</p>
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
                lastDraw : "getLastDraw",
                thief_list : "getThiefList",
                police_list : "getPoliceList",
                escape_list_last : "getEscapeLastNumber",

            })
        },
        methods:{
            ...mapMutations({
                deckDraw : "deckDraw",
                closeBox : "closeBox",
                clearPrev : "clearPrev",
                turnBoxOn : "turnBoxOn",
                toggleCross: "toggleCross"
            }),
            decktoHand:function(e,item){
                if(item.length >= 1){
                    
                    let hand;
                    if(this.role == "thief"){
                        hand = this.thief_list.thief_hand;
                    }else{
                        hand = this.police_list.police_hand;
                    }
                    this.enemyDraw = parseInt(e.currentTarget.getAttribute('id').slice(4));
                    
                    if(item.length  == 1){
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

                    this.deckDraw( 
                        { 
                            'hand': hand,
                            'num': 1, 
                            'item': item
                        }
                    );
                    
                    if(this.role == "police"){
                        this.toggleCross(this.lastDraw -1);
                    }
                    this.turnBoxOn('hand');
                }
                    
                    
            }
        }
    }
</script>



<style lang="scss" scoped>
    #draw-box{
        max-width:625px;
    }
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
        border-color:#0d6efd;
        cursor: pointer;
        &:hover{
            border-color:#007bff;
            box-shadow: 0px 0px 10px;
        }
        &.deskDisabled{
            border-color: #ccc;
            color: #aaa;
            cursor: default;
            &:hover{
                border-color:#ccc;
                box-shadow: 0px 0px 0px;
            }
            .card-wrapper{
                opacity: 0.6;
                cursor: default;
                a{
                    cursor: default;
                }
            }
        }
        .card-wrapper{
            margin: 0 auto;
        }
        h4{
            text-align: center;
        }
        p {
            margin-top: 8px;
            margin-bottom: 0px;
            min-width: 90px;
            text-align: center;
        }
    }
</style>
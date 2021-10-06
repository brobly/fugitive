
<template>
  <div v-show="drawOn=='draw' " id="draw-box" class="box containBox">
       <a class="btn-close-box" 
       @click="closeBox" href="javascript:void(0)"></a>
        <div class="content">
            <div class="c-icon">
                <div class="c-icon__i c-icon__i--draw-img c-background--full"></div>
            </div>
            <div class="state-text">
                <p>請選擇以下牌組以抽取一張藏身地點卡</p>
            </div>
            <div class="draw-list">
                <a array="1" class="draw-deck" href="javascript:void(0)">
                    <h4>04 - 14</h4>
                    <card front='card-back'></card>
                    <p>剩餘：<span>{{deck1.length}}</span>張</p>
                </a>
                <a array="2" class="draw-deck" href="javascript:void(0)">
                    <h4>15 - 28</h4>
                    <card front='card-back'></card>
                    <p>剩餘：<span>{{deck2.length}}</span>張</p>
                </a>
                <a array="3" class="draw-deck" href="javascript:void(0)">
                    <h4>29 - 41</h4>
                    <card front='card-back'></card>
                    <p>剩餘：<span>{{deck3.length}}</span>張</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    export default {
        name: 'draw',
        data(){
            return{
            }
        },
        props:{

        },
        components:{
        },
        computed:{
            ...mapGetters({
                role:"getRole",
                drawOn : "getBoxOn",
                deck1 :"getDeck1",
                deck2 :"getDeck2",
                deck3 :"getDeck3",
            })
        },
        methods:{
        }
    }
</script>



<style lang="scss" scoped>
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

<template>
  <div v-show="handOn=='hand' " id="hand-box" class="box containBox">
       <a class="btn-close-box" 
       @click="closeBox" href="javascript:void(0)"></a>
        <div class="wrapper">
            <div class="content">
                <div class="c-icon">
                    <div class="c-icon__i c-icon__i--hand-img c-background--full"></div>
                </div>
                <p class="text-center">這是你的手牌</p>
                <!-- <div class="timer-wrapper">計時：<div class="timer">120s</div></div> -->
                <span class="hand-last-draw" v-if="!firstRound">你剛抽到第{{lastDraw}}號卡牌</span>
                
                <template v-if="role=='thief'">
                    <thiefAction></thiefAction>
                </template>

                <template v-else>
                    <policeAction></policeAction>
                </template>

                <!--   <div class="progress-bar">
                    <div id="game-bar" class="bar" ></div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>

    import { mapGetters, mapMutations } from "vuex"
    
    import thiefAction from "./action/thief_action.vue"
    import policeAction from "./action/police_action.vue"
    export default {
        name: 'hand',
        data(){
            return{
            }
        },
        components:{
            thiefAction,
            policeAction
        },
        computed:{
            ...mapGetters({
                role:"getRole",
                handOn : "getBoxOn",
                firstRound : "getFirstRound",
                lastDraw : "getLastDraw",
            }),
        },
        methods:{
            ...mapMutations({
                closeBox : "closeBox",
            })
        }
    }
</script>

<style lang="scss">

    .hand-list{
        display: inline-block;
        .card-wrapper{
            float:left;
            margin-bottom: 10px;
        }
    }
    .hand-last-draw{
        position: absolute;
        right: 35px;
        top: 52px;
    }

</style>
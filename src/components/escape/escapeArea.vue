<template>
    <div class="game-container">
        <p id="text-thief-hand"></p>
        <div id="role" class="row">
            <div class="col-auto me-auto ms-auto">
                <b v-if="role == 'thief'">逃亡者</b>
                <b v-else>神探</b>
            </div>
        </div>

        <div id="desk">
            <div class="state-text">
                <p></p>
            </div>
            <div class="desk-wrapper">
                <deckListVertical></deckListVertical>
                
                <div id="escape-area" class="escape-area">
                    <escapeList></escapeList>
                </div>
            </div>
        </div>
        <div v-if="endOn" id="js-end-turn--visible">
            <span style="padding-right: 15px;">請點擊結束回合</span>
            <button id="btn-end-turn" 
            @click="setStateBox({icon :'info', msg : '確定結束回合嗎' , status: 'end', size :'small'});"
            class="btn btn-primary">結束回合</button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import escapeList from "./escapeList.vue"
import deckListVertical from "./deckListVertical.vue"
    export default {
        name: 'escapeArea',
        data(){
            return{
            }
        },
        computed:{
            ...mapGetters({
                role:"getRole",
                endOn : "getEndOn"
            })
        },
        methods:{
            ...mapActions({
                setStateBox:'setStateBox'
            }),
        },
        components:{
            'deckListVertical' : deckListVertical,
            'escapeList' : escapeList
        }
    }
</script>

<style lang="scss" scoped>
    #text-thief-hand{
        position: absolute;
        right: 25px;
        top: 75px;
    }
    #role{
        padding-top:10px;
        font-size: 25px;
        padding-bottom: 10px;
    }
 
    .desk-wrapper{
        display: flex;
        width: calc(100% - 100px);
    }

    .escape-area{
        /*width: calc(100% - 205px);*/
        width: 100%;
    }

    #js-end-turn--visible{
        position: absolute;
        right: 35px;
        bottom: 45px;
    }

    @media only screen and (max-width: 420px) {
        #js-end-turn--visible{
            right: 0.625rem;
            bottom: 10rem;
        }
    }
</style>
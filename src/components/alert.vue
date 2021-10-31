
<template>
    <div v-if="alertOn == 'alert'" id="alert-box" :class="[{'confirm' : boxState == 'confirm'}, size]" class="box containBox">
        
        <div class="wrapper">
            <div class="content">
                <!-- icon -->
                <i v-if="boxIcon == 'info'" class="info c-background--full"></i>
                <i v-else class="full-bg" :class="boxIcon"></i>

                <!-- role -->
                <h2 v-if="boxState == 'win'" id="role-winning">{{role}}勝利!!!</h2>

                <!-- desc -->
                <div class="state-text">
                    <p>{{stateText}}</p>
                </div>

                <!-- btn -->
                <div v-if="boxState == 'normal'" id="btn-normal" class="btn-group-wrap">
                    <button @click="closeBox" class="btn btn-primary">確定</button>
                </div>

                <div v-else-if="boxState == 'start'" id="btn-normal" class="btn-group-wrap">
                    <button v-if = "firstRound" @click="turnBoxOn('hand')" class="btn btn-primary">確定</button>
                    <button v-else @click="turnBoxOn('draw')" class="btn btn-primary">確定</button>
                </div>

                <div v-else-if="boxState == 'pass'" id="btn-pass-group" class="btn-group-wrap">
                    <div class="btn-group">
                        <button @click = "thiefEnd" id="btn-pass" class="btn btn-primary">Pass</button>
                        <button @click="closeBox" class="btn btn-primary ">取消</button>
                    </div>
                </div>

                <div v-if="boxState == 'special'" id="btn-normal" class="btn-group-wrap">
                    <button @click="spacialStart" class="btn btn-primary">確定</button>
                </div>

                <div v-else-if="boxState == 'win'" id="btn-win-group" class="btn-group-wrap">
                    <div class="btn-group">
                        <button @click="gameStart" class="btn btn-primary">再來一局</button>
                    </div>
                </div>

                <div v-else-if="boxState == 'end'" id="btn-end-group" class="btn-group-wrap">
                    <div class="btn-group">
                        <button @click="endUp" id="btn-end-yes" class="btn btn-primary">結束</button>
                        <button @click="closeBox" class="btn btn-primary">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapMutations, mapActions } from "vuex";

    export default {
        name: 'Alert',
        computed:{
            ...mapGetters({
                role:"getRole",
                alertOn : "getBoxOn",
                firstRound : "getFirstRound",
                boxIcon:"getBoxIcon",
                stateText : "getStateText",
                boxState : "getBoxState",
                size : "getBoxSize"
            })
        },
        methods:{
            ...mapMutations({
                turnBoxOn : "turnBoxOn",
                closeBox : "closeBox"
            }),
            ...mapActions({
                thiefEnd: "thiefEnd",
                gameStart: "gameStart",
                endUp :"endUp",
                spacialStart:"spacialStart"
            }),
        }
    }

</script>
<style lang="scss" scoped>
#alert-box {
    h2 {
        text-align: center;
        display: none;
    }
    .state-text p {
        text-align: center;
        font-size: 1.75rem;
    }
}
</style>
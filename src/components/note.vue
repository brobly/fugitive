
<template>
  <div v-show="noteOn=='note' " id="note-box" class="box containBox">
       <a class="btn-close-box" 
       @click="closeBox" href="javascript:void(0)"></a>
        <div class="content">
            <div class="c-icon">
                <div class="c-icon__i c-icon__i--note-img c-background--full"></div>
            </div>   
            <h4>神探筆記</h4>
            <div class="card-table">
                <p>請剔除不需要的藏身地點已作參考</p>
                <div class="police-table police-note">
                    <div  v-for="(i,index) in crossList" :key="('police-note' + index)" 
                    class="police-table-item" @click="toggleCross( index )"
                        :class="{'cross': i}">
                            {{index + 1}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapMutations, mapActions } from "vuex";

    export default {
        name: 'note',
        data(){
            return{
            }
        },
        computed:{
            ...mapGetters({
                noteOn : "getBoxOn",
                crossList : "getPoliceCrossList"
            })
        },
        methods:{
            ...mapMutations({
                closeBox : "closeBox",
            }),
            ...mapActions({
                toggleCross :"toggleCross"
            }),
        }
    }

</script>
<style lang="scss" scoped>
</style>
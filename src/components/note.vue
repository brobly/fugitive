
<template>
  <div v-show="noteOn=='note' " id="note-box" class="box containBox">
       <a class="btn-close-box" 
       @click="closeBox" href="javascript:void(0)"></a>
        <div class="content">
            <div class="c-icon">
                <div class="c-icon__i c-icon__i--note-img c-background--full"></div>
            </div>   
            <h4>神探筆記</h4>
            <table id="table-detective-select" class="card-table">
                <thead>
                    <tr>
                        <td colspan="6">請剔除不需要的藏身地點已作參考</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in 7" :key="('police-selecr-tr'+i)">
                        <td v-for="j in 6" :key="('police-select-td' + i + j)"
                        @click="addPoliceCross( (j + (i-1) * 6) - 1 )"
                        :class="{'cross': crossList[j + (i-1) * 6]}">
                            {{ j + (i-1) * 6 }}
                        </td>
                    </tr> 
                </tbody>
            </table>
           
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
                addPoliceCross : "addPoliceCross",
            })
        }
    }

</script>
<style lang="scss" scoped>

</style>
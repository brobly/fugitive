<template>
    <div>
        <div v-for="item,index in escape_list" :key="('main-' + item.main)"
         class="escape-list" @click="displayAllNum(item.status,index)">

            <template v-if="item.sub != []">
                <card v-for="subItem in item.sub" :key="('sub-' + subItem)" 
                :number='subItem' :front="(item.status) ? 'card-front' : 'card-back'"
                main="card-sub" :flipped="(item.status) ? 'is-flipped': ''" ></card>
            </template>
            
            <card :number='item.main' :front="(item.status) ? 'card-front' : 'card-back'"
            main="card-main" :flipped="(item.status) ? 'is-flipped' : ''" ></card>

            <div v-if="currentTab == index" class="number-detail">
                <p>地點："{{item.main}}"</p>
                <p>搭配："<span>{{item.sub.toString()}}</span>"(加速:{{item.speed}}步)</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from "vuex"
    import card from "../card.vue"
    export default {
        name: 'escapeList',
        data(){
            return{
            }
        },
        components:{
            card: card
        },
        computed:{
            ...mapGetters({
                role : "getRole",
                escape_list : "getEscapeList",
                currentTab : "getCurrentTab"
            }),
        },
        methods:{
            ...mapMutations({
                changeCurrentTab : "changeCurrentTab"
            }),
            displayAllNum:function(status,index){
                if(this.role == "thief" || (this.role == "police" && status)){
                    this.changeCurrentTab(index);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.escape-list {
  margin-bottom: 10px;
  float: left;
  position: relative;
  height: 110px;
}


div.number-detail {
  position: absolute;
  left: 12px;

  p {
    margin-bottom: 0px;
    font-size: 13px;
    white-space: nowrap;
  }
}
</style>

<template>
  <div v-show="ruleOn=='rule' " id="rule-box" class="box containBox">
       <a class="btn-close-box" 
       @click="closeBox" href="javascript:void(0)"></a>
       <div class="content">
          <div class="c-icon">
               <div class="c-icon__i c-icon__i--manual-img c-background--full">
               </div>
          </div>
          <h4>遊戲設置：</h4>
          <ul>
              <li>00號卡牌放在桌子中央</li>
              <li>逃亡者開始擁有01，02，03和42號卡牌，然後從04 - 14牌庳中抽取3張牌、15-28牌庳中抽取2張牌給作為起始手牌</li>
              <li>神探開始擁有從04 - 14牌庳中抽取2張牌作手牌</li>
          </ul>
  
          <h4>遊戲目的：</h4>
          <ul>
              <li>逃亡者順利打出第42號卡牌，逃亡者勝出</li>
              <li>神探順利把逃亡者打出的每個藏身地點揭示出來，神探勝出</li>
          </ul>
  
          <h4>逃亡者的移動方式：</h4>
          <ul>
              <li>逃亡者會由地點00的卡牌開始逃走，目標是逃到地點42號的卡牌。</li>
              <li>逃亡者每回合打出的卡牌就是新的藏身地點，所有卡牌打出時也會反轉，直到被神探正確說出數字即揭示出來才會翻開。</li>
              <li>打出新的藏身地點數值基本上不能跟上一個藏身地點超出3點，例如上一個藏身地點是00，所以只能打出01，02，03其中一張牌。</li>
              <li>在卡牌上會有腳印表記，可以搭配藏身地點卡當加速牌一起打出，每一個腳印（單邊算一個）可加1點速度，
                  例如上一個藏身地點是00，你搭配一張1張腳印表記的卡所以你能打出01，02，03及04其中一張牌了</li>
              <li>搭配的加速牌數量不限，但要小心愈是加速手上的牌就會愈少，神探能估出正確的藏身地點機會就會增加。</li>
              <li>逃亡者不能走回頭路，即不能打出比上一個地點數值較小的卡牌。</li>
          </ul>
          <h4>揭示藏身點：</h4>
          <ul>
              <li>每個回合神探可以揭示逃亡者藏身地點的數值即正確地選出數字</li>
              <li>點選藏身地點的數字，只要數字正確，系統便會把該卡牌打開。(如有加速牌也一同打開)</li>
              <li>神探也可以點選多個數字，但需要全部都正確，系統才會把卡牌打開，只要當中有1個數字不正確都不會打開。</li>
              <li>如只猜對加速卡的數字，也不會打開。</li>
          </ul>
  
  
          <h4>遊戲流程：</h4>
          <p>兩人輪流進行回合，由逃亡者開始</p>
  
          <h4>第一回合：</h4>
          <ul>
              <li>逃亡者：從手上的9張卡中打出兩張成為新的藏身地點。</li>
              <li>神探：從手上兩張手牌，進行揭示並推測逃亡者的藏身地點。</li>
          </ul>
  
          <h4>第二回合開始：</h4>
          <ul>
              <li>逃亡者：於任何一疊牌庫抽取一張卡牌，打出一張新的藏身地點或不打出卡牌(PASS)</li>
              <li>神探：於任何一疊牌庫抽取一張卡牌，並進行揭示藏身地點。</li>
          </ul>
  
          <h4>最後揭示：</h4>
          <ul>
              <li>如逃亡者成功把42號卡牌打出，而神探所揭示出來的藏身地點只到29號或以下，可以進行最後的揭示程序。</li>
              <li>神探可以繼續揭示單個地點的號碼，如猜對，可繼續猜下去，一旦錯誤，逃亡者勝出。</li>
              <li>如此時神探順利把所有地點猜中，神探勝出。</li>
          </ul>
      </div>
        <button @click="closeBox" class="btn btn-primary close-fancy">確定</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { mapMutations } from "vuex"
export default {
    name: 'rule',
    computed:mapGetters({
      ruleOn : "getBoxOn",
    }),
    methods:{
        ...mapMutations({
            closeBox : "closeBox"
        })
    }
}
</script>


<style lang="scss" scoped>
    #rule-box{
        height: 550px;
        .content{
            height: 82%;
            overflow: auto;
            margin: 20px 20px 0px;
        }
        ul{
            margin-bottom:20px;
        }
        .btn{   
            margin: 10px auto;
        }
    }
</style>

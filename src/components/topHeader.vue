<template>
    <div class="l-header">
        <div class="l-header__title">
            <!-- <h1>神探緝兇{{vueEnv}}</h1> -->
            <h1>神探緝兇</h1>
        </div>
        <div class="l-header__user-info">
            <div class="c-icon">
                <div class="c-icon__i c-icon__i--account-img c-background--full"></div>
            </div>
            <div class="user-info__account-desc">Johnny Lau</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'topHeader',
  data(){
    return{
        // vueEnv : process.env.VUE_APP_ENV
    }
  },
  props: {
  }
}
</script>

<style scoped>
  /* header part */
      .l-header{
          display: flex;
          background-image: url(../assets/images/Header-Background-1024x205.jpg);
          padding: 0px 15px;
          height:56px;
          position: relative;
          box-shadow: 0px 5px 10px;
      }
      .l-header__title{
          display: flex;
          width:100%;    
          align-items: center;
      }
      .l-header__title h1{
            color: #efefef;
            font-size: 2rem;
            margin: 0;
      }
      .l-header__user-info{
          display: flex;
          width:100%;
          justify-content: flex-end;
          align-items: center;
      }

      .user-info__account-desc{    
            font-size: 1.3rem;
            margin-left: 0.625rem;
      }


      .user-info__btn-sign-out{
          height:40px;
          margin-top:3px;
      }

    .c-icon__i--account-img{
        background-image: url(../assets/images/account.png);
        height: 1.562rem;
        width:1.562rem;
    }

</style>

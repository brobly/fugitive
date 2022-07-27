<template>
    <div class="nav-item">
        <a class="c-icon" @click="$emit('turn')" href="javascript:void(0)">
            <div :class="('c-icon__i--' + icon + '-img')" class="c-icon__i c-background--full"></div>
            <div class="nav-desc">{{desc}}</div>
        </a>
        
    </div>
</template>

<script>
export default {
    name: 'rightNav',
    props:{
        icon : String,
        desc : String
    },
    data(){
        return{
            
        }
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>

    .nav-item{
        position:relative;
        margin: 2.5rem 0.625rem;
        width: 3.5rem;
        height: 3.5rem;
        .c-icon:hover > .nav-desc{
            display: block;
        }
    }
    .c-icon{
        width: 100%;
        height: 100%;
    }
    .nav-desc{
        display: none;
        position: absolute;
        transform: translateY(-50%);
        left: -150%;
        top: 50%;
        background: white;
        border-radius: 5px;
        padding: 1px 5px;
        border: 1px solid #ccc;
        color:black
    }
</style>

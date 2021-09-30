<template>
    <div class="nav-item">
        <a class="c-icon" @click="$emit('turn')" href="javascript:void(0)">
            <div :class="('c-icon__i--' + icon + '-img')" class="c-icon__i c-background--full"></div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'rightNav',
    props:{
        icon : String
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

</style>

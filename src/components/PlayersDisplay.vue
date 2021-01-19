<template>
<Fragment>
    <div v-if="!mobile">
        <p :class="{active:p1}">Player 1</p>
        <p :class="{active:p2}">Player 2</p>
    </div>
    <div v-if="mobile" :class="{mobile}">
        <p :class="{active:p1}">P1</p>
        <p :class="{active:p2}">P2</p>
    </div>
</Fragment>
</template>

<script>
import {Fragment} from "vue-fragment"
export default{
    name:"PlayersDisplay",
    components:{
        Fragment
    },
    data:function(){
        return {
            p1:true,
            p2:false,
            mobile:this.$store.state.mobile
        }
    }
}
</script>

<style lang="scss" scoped>
    div{
        display: flex;
        height: 100%;

        p{
            color:#C6C6C6;
            font-size: 28px;
        }
    }

    div:not(.mobile){
        flex-direction: column;
        width: 25%;
    }

    div.mobile{
        width: 100%;
        justify-content: space-evenly;
    }

    .active{
        color:var(--c4);
    }
</style>
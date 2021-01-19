<template>
    <div :class="{mobile}">
        <p>{{progressText[progressIndex]}}</p>
        <input v-if="showInput" type="text" placeholder="Enter code here">
    </div>
</template>

<script>

export default {
    name:"Advisor",
    data:function(){
        return {
            showInput:false,
            progressText:{
                0:"Select a color",
                1:"Pick a game mode",
            },
            progressIndex:0,
            mobile:this.$store.state.mobile
        }
    }
}
</script>

<style lang="scss" scoped>
    div{
        height:60px;
        width:max-content;
        padding:0px 30px;
        display: flex;
        align-items: center;
        justify-content: center;

        box-shadow:var(--box-shadow);
        border-radius:var(--border-radius);

        p{
            color:var(--c3);
        }
    }

    div.mobile{
        width: 100%;
    }
</style>
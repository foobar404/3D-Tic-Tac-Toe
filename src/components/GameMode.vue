<template>
    <div id="gameMode">
        <div :class="{active:robotMode}" @click="handleClick('robot')"><v-icon size="30">android</v-icon></div>
        <div :class="{active:humanMode}" @click="handleClick('human')"><v-icon size="30">face</v-icon></div>
    </div>
</template>

<script>


export default{
    name:"GameMode",
    data:function(){
        return {
            robotMode:false,
            humanMode:false
        }
    },
    methods:{
        handleClick:function(mode){
            if(mode === "robot"){
                this.robotMode = true
                this.humanMode = false
            }else{
                this.humanMode = true
                this.robotMode = false
            } 
        }
    }
}
</script>

<style lang="scss" scoped>
    #gameMode{
        width: 150px;
        height:60px;
        display: flex;
        overflow: hidden;
        border-radius:var(--border-radius);
        box-shadow:var(--box-shadow);
        
        div{
            width: 50%;
            height:100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            // border-right:1px solid #eee;
            box-sizing: border-box;
        }
        div:hover{
            background: var(--c1);
            opacity: .3;
        }
    }

    .active{
        background:var(--c1);
        color:#fff;
    }
    .active:hover{
        opacity: 1 !important;
    }
</style>
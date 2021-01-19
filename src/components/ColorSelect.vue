<template>
    <div class="colorBox" :class="{mobile}">
        <div class="colorWrapper">
            <div v-for="color in colors" :key="color" class="color" :style="{background:color}" @click="handleClick(color)" :class="{active:activeColor === color}">
            </div>   
        </div>
    </div>
</template>

<script>
    
    export default{
        name:"ColorSelect",
        methods:{
            handleClick(color){
                this.activeColor = color
                this.$store.commit("updateColor",color)
            }
        },
        data:function(){
            return {
                colors:["#FF0000","#FF8A00","#FFC700","#FFF500","#BDFF00","#00FF38","#00FFC2","#00FFFF","#0094FF",
                "#1400FF","#EB00FF","#FF008A"],
                activeColor:"",
                mobile:this.$store.state.mobile
            }
        }
    }
</script>

<style lang="scss" scoped>
    .colorBox{
        .colorWrapper{
            width: 100%;
            height: 100%;
            display:flex;
            justify-content: space-evenly;
        }
    }

    .colorBox:not(.mobile){
        width:min-content;
        height:50px;
        background:#EAEAEA;
        border-radius: 40px 40px 0 0;   
        padding:0 30px 0 30px;

        .colorWrapper{
            position: relative;
            bottom:50%;
        }

        .color{
            height:65px;
            width:65px;
            box-sizing:border-box;
            border-radius:50%;
            border:8px solid #EAEAEA;
            cursor:pointer;
            transition:.25s ease;
        }

        .color:hover{
            border:8px solid var(--c2) ;
        }

        .active{
            border:8px solid var(--c3) !important;
        }
    }

    .colorBox.mobile{
        width: 100%;

        .colorWrapper{
            flex-wrap:wrap;
        }

        .color{
            width: 15%;
            padding-bottom: 15%;
            border-radius:50%;
            margin-bottom: 10px;
            box-sizing: border-box;
        }

        .active{
            padding-bottom: 12% !important;
            border:5px solid var(--c3) !important;
        }
    }

</style>
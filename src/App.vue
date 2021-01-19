<template>
<Fragment>
  <main id="vue" v-if="!mobile">
    <section id="s1">
      <Advisor />
      <GameMode />
    </section>

    <section id="s2">
      <PlayersDisplay />
      <Cube />
    </section>

    <section id="s3">
      <ColorSelect />
    </section>
  </main>

  <main id="vue" v-if="mobile" :class="{mobile}">
    <section id="s1">
      <GameMode />
    </section>

    <section id="s2">
       <PlayersDisplay />
    </section>

    <section id="s3">
      <Cube />
    </section>

    <section id="s4">
       <ColorSelect />
    </section>

    <section id="s5">
      <Advisor />
    </section>
  </main>
</Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import ColorSelect from "./components/ColorSelect.vue"
import Cube from "./components/Cube.vue"
import Advisor from "./components/Advisor.vue"
import GameMode from "./components/GameMode.vue"
import PlayersDisplay from "./components/PlayersDisplay.vue"


export default {
  name: 'App',
  data:function(){
    return {}
  },
  computed:{
      mobile:function(){
        return this.$store.state.mobile
      }
  },
  methods:{
    handleResize(){
      this.$store.commit("resize")
      console.log(this.$store.state.mobile)
    }
  },
  mounted(){
    window.addEventListener("resize",()=>{
      this.handleResize()
    })
  },
  components: {
    ColorSelect,
    Cube,
    Advisor,
    GameMode,
    PlayersDisplay,
    Fragment
  }
}
</script>

<style lang="scss">

:root{
  --c1:#84D2F6;
  --c2:#59A5D8;
  --c3:#386FA4;
  --c4:#133C55;
  --box-shadow:7px 7px 10px 0px #d4d4d4;
  --border-radius:12px;
}

html,body{
  margin:0;
  height:100vh;
  width:100vw;
}

#vue{
  height:100vh;
  width:100vw;
  box-sizing:border-box;
  display:flex;
  flex-direction: column;
  
}

#vue:not(.mobile) {
  padding:40px 40px 0 40px;

  #s1{
    height:15%;
    display: flex;
    justify-content: space-between;
  }
  #s2{
    height:70%;
    display: flex;
  }
  #s3{
    height:15%;
    display:flex;
    align-items:flex-end;
    justify-content:center;
  }
}

#vue.mobile{
  padding:20px 20px 0 20px;

  section{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #s1{
    height: 10%;
  }
  #s2{
    height: 10%;
  }
  #s3{
    height: 50%;
  }
  #s4{
    height: 20%;
  }
  #s5{
    height: 10%;
  }
}
</style>

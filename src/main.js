import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

Vue.use(Vuetify)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    mobile:window.innerWidth < 880,
    userColor:""  
  },
  mutations: {
    updateColor(state,color){
      state.userColor = color
    },
    resize(state){
      state.mobile = window.innerWidth < 880
    }
  }
})


new Vue({
    ...App,
    store
}).$mount("#app")





 

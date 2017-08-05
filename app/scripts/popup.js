import Vue from 'vue'
import Vuex from 'vuex'
import App from '../component/app.vue'
import huntHelperApi from './axios'

Vue.use(Vuex)

const store = new Vuex.store({
  plugins: [
    createPersistedState({
      paths: ['hunter.token', 'hunter.hunter.email'],
    }),
  ],
})

var app=new Vue({
  el:'#app',
  store,
  render: h =>h(App)
})

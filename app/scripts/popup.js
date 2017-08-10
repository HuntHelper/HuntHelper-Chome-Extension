import Vue from 'vue'
import Vuex from 'vuex'
import Popup from '../component/popup.vue'
import createPersistedState from 'vuex-persistedstate'
import huntHelperApi from './axios'
import hunter from './store/hunter'
import hunts from './store/hunts'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: [
    hunter,
    hunts
  ],
  plugins: [
    createPersistedState({
      paths: ['hunter.token', 'hunter.hunter.email'],
    }),
  ],
})

var app=new Vue({
  el:'#app',
  store,
  render: h =>h(Popup)
})
console.log(process.env.NODE_ENV)
if (__ENV__ != 'production') { //eslint-disable-line
  window.app = app
}

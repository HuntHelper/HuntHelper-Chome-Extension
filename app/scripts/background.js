// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from './axios'
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

axios.request({
  method: 'get',
  url: '/',
  baseURL: '__HOST__',
  headers: {},
  withCredentials: true
}).then((response) => {
  // initial get is to set CSRF cookie
  console.log(document.cookie)
  chrome.cookies.getAll({}, function(cookies) {
    console.log('cookies', cookies)
  })
  console.log('response', response)
  const token = store.state.token
  if (token != '') axios.defaults.headers.common.Authorization = token
  axios.post('/hunter/sign_in.json', { withCredentials: true }).then((response) => {
    const hunter = response.data.hunter
    store.commit('HUNTER_SET', [hunter])
    store.dispatch('HUNT_LIST_LOAD')
  }, (err) => {
    console.log('post', err)
  })
}, (err) => {
  console.log('get', err)
})

// chrome.runtime.onInstalled.addListener(function (details) {
//   console.log('previousVersion', details.previousVersion);
// });

// chrome.browserAction.setBadgeText({text: ''});

// // from https://developer.chrome.com/extensions/app_identity
// chrome.identity.launchWebAuthFlow(
//   {'url': '__HOST__/oauth/authorize', 'interactive': true},
//   function(redirect_url) {
//     /* Extract token from redirect_url */
//   })

// from https://stackoverflow.com/a/25046173/5661887
// chrome.identity.getAuthToken({
//   interactive: true
// }, function(token) {
//   if (chrome.runtime.lastError) {
//     alert(chrome.runtime.lastError.message)
//     return
//   }
//   const x = new XMLHttpRequest()
//   x.open('GET', 'https://localhost.ssl/oauth/userinfo?alt=json&access_token=' + token)
//   x.onload = function() {
//     alert(x.response)
//   }
//   x.send()
// })

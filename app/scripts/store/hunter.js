import Vue           from 'vue'
import huntHelperApi from '../axios'
import * as Cookies  from 'js-cookie'

const defaultHunterData = {
  email:   '',
  contact: { name: null },
}

const hunterModule = {
  state: {
    hasCurrentSession:       false,
    hunter:                  defaultHunterData,
    token:                   '',
  },
  actions: {
    HUNTER_LOAD(context) {
      // Loads hunter info from the server, given the user is logged in via cookie
      const token = context.state.token
      if (token != '')
        huntHelperApi.defaults.headers.common.Authorization = token
      huntHelperApi.post('/hunter/sign_in.json').then((response) => {
        const hunter = response.data.hunter
        context.commit('HUNTER_SET', [hunter])
        context.dispatch('HUNT_LIST_LOAD')
      }, () => {
        context.commit('HUNTER_REMOVE_LOGIN_INFO')
      })
    },
    HUNTER_LOGIN(context, [formData]) {
      const hunterLogin = { email: formData.email, password: formData.password }
      huntHelperApi.post('/hunter/sign_in.json', { hunter: hunterLogin }).then((response) => {
        const hunter = response.data.hunter
        const token  = response.headers.authorization
        context.commit('HUNTER_SET_LOGIN_TOKEN', [token])
        huntHelperApi.defaults.headers.common.Authorization = token
        context.commit('HUNTER_SET', [hunter])
        context.dispatch('HUNT_LIST_LOAD')
      })
    },
    HUNTER_LOGOUT(context) {
      huntHelperApi.delete('/hunter/sign_out.json').then((response) => {
        huntHelperApi.defaults.headers.common.Authorization = ''
        const newCsrfToken = response.data.csrfToken
        Cookies.set('XSRF-TOKEN', newCsrfToken, { secure: true })
        context.commit('HUNTER_REMOVE_LOGIN_INFO')
        window.localStorage.clear()
        Cookies.remove('_session_id')
      })
    },
  },
  mutations: {
    HUNTER_REMOVE_LOGIN_INFO: (state) => {
      state.token = ''
      state.hunter = defaultHunterData
      state.hasCurrentSession = false
    },
    HUNTER_SET: (state, [hunter]) => {
      state.hunter = hunter
      state.hasCurrentSession = true
    },
    HUNTER_SET_LOGIN_TOKEN: (state, [token]) => {
      state.token = token
    }
  },
  getters: {
    hunterIsLoggedIn: (state) => {
      return state.hasCurrentSession
    },
    hunterIsLoggedInWithCookie: (state) => {
      return state.token != ''
    },
    hunterNameOrEmail: (state) => {
      const name = state.hunter.contact.name
      if (name == null || name == '')
        return state.hunter.email
      return name
    },
    hunterToken: (state) => {
      return state.token
    }
  },
}

export default hunterModule

import huntHelperApi from '../axios'

const huntsModule = {
  state: {
    hunts:  [],
    loaded: false,
    selectionIndex: null
  },
  actions: {
    HUNT_LIST_LOAD(context) {
      return huntHelperApi.get('/api/hunts.json').then((response) => {
        const hunts = response.data.hunts
        context.commit('HUNT_LIST_UPDATE', {hunts})
      })
    }
  },
  mutations: {
    HUNT_LIST_UPDATE: (state, {hunts}) => {
      state.hunts = hunts
      state.loaded = true
    },
    HUNT_SELECT: (state, [huntIdx]) => {
      if (typeof huntIdx == 'number') {
        state.selectionIndex = huntIdx
      }
    },
  },
  getters: {
    activeHunts(state) {
      return state.hunts.filter((hunt) => hunt.active)
    },
    selectedHunt(state) {
      return state.hunts[state.selectionIndex]
    }
  },
}

export default huntsModule

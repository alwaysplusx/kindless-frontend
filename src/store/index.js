import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getters = {
  user: state => state.user,
  authorized: state => state.authorized
}

const store = new Vuex.Store({
  getters
})

export default store

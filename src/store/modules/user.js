import $ from '@/apis'

const user = {
  state: {
    username: '',
    accessToken: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    login: function ({ commit }, data) {
      return new Promise((resolve, reject) => {
        $.login(data.username, data.password)
          .then(response => {
            commit('SET_TOKEN', data.token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }

}

export default user

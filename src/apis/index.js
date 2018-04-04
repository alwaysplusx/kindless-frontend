import client from './client'
import user from './user'
import menu from './menu'
import permission from './permission'

const login = (username, password) => {
  var params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  return client.post('/login', params)
}

const logout = () => {
  return client({
    url: '/logout',
    method: 'get'
  })
}

export default { login, logout, user, menu, permission }

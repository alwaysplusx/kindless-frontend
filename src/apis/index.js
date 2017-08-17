import client from './client'
import user from './user'
import menu from './menu'
import permission from './permission'

const login = (username, password) => {
  const result = client.post('/login', {
    username: username,
    password: password
  })
  return result
}

const logout = () => {
  return client({
    url: '/logout',
    method: 'get'
  })
}

export default { login, logout, user, menu, permission }

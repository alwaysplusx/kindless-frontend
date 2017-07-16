import client from './client'
import user from './user'

const login = (username, password) => {
  const result = client.post('/signin', {
    username: username,
    password: password
  })
  return result
}

const logout = () => {
  return client({
    url: '/signout',
    method: 'get'
  })
}

export default { login, logout, user }

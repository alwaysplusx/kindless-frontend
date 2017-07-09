import client from './client'

const login = (username, password) => {
  return client.post('/signin', {
    username: username,
    password: password
  })
}

const logout = () => {
  return client({
    url: '/signout',
    method: 'get'
  })
}

export default { login, logout }

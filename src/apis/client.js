import axios from 'axios'
// import { Message } from 'element-ui'
import store from '@/store'

const client = axios.create({
  baseURL: 'http://127.0.0.1:9000',
  timeout: 30 * 1000
})

client.interceptors.request.use(request => {
  if (store.getters.authorized) {
    request.headers['X-Authorization'] = store.getters.token
  }
  return request
}, error => {
  console.error(error)
})

client.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // Message({
    //   message: error.message,
    //   type: 'error'
    // })
    return Promise.reject(error)
  }
)

export default client

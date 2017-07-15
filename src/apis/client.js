import axios from 'axios'
// import store from 'src/store'

const client = axios.create({
  baseURL: 'http://127.0.0.1:9000',
  timeout: 3000
})

client.interceptors.request.use(request => {
  // TODO set access_token or jwt
  return request
}, error => {
  console.error(error)
})

client.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default client

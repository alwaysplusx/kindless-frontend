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

// client.interceptors.response.use(
//   response => response,
//   error => {
//     console.error(error)
//   }
// )

export default client

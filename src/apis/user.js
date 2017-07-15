import client from './client'

const page = () => {
  return client({
    url: '/user/page',
    method: 'get'
  })
}

export default { page }

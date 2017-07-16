import client from './client'

const page = (params) => {
  return client({
    url: '/user/page',
    method: 'get',
    params
  })
}

export default { page }

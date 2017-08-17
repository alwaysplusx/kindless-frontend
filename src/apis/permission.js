import client from './client'

const getList = (params) => {
  return client({
    url: '/permission/list',
    method: 'get',
    params
  })
}

const create = (user) => {
  return client({
    url: '/permission/create',
    method: 'post',
    data: user
  })
}

const remove = (names) => {
  return client({
    url: '/permission/delete',
    method: 'post',
    data: names
  })
}

const update = (user) => {
  return client({
    url: '/permission/update',
    method: 'post',
    data: user
  })
}

export default { getList, create, remove, update }

import client from './client'

const create = (menu) => {
  return client({
    url: 'menu/create',
    method: 'post',
    data: menu
  })
}

const update = (menu) => {
  return client({
    url: 'menu/update',
    method: 'post',
    data: menu
  })
}

const getTree = () => {
  return client({
    url: 'menu/tree',
    method: 'get'
  })
}

const getChildren = (code) => {
  return client({
    url: 'menu/children',
    method: 'get',
    params: {
      code: code
    }
  })
}

const getOptions = () => {
  return client({
    url: 'menu/options',
    method: 'get'
  })
}

export default { create, update, getTree, getChildren, getOptions }

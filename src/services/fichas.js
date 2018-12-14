import request from '../libs/request'

export async function fichas(query) {
  return await request({
    url: `/api/ficha/?${query}`,
    method: 'get'
  }).then(res => {
    return res.data
  })
}

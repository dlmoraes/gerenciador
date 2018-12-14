import request from '../libs/request'

export async function getAnotacoes(query) {
  return await request({
    url: `/api/diario/?${query}`,
    method: 'get'
  })
}

export async function getAnotacao(id) {
  return await request({
    url: `/api/diario/${id}/`,
    method: 'get',
    loading: 'hourglass'
  })
}

export async function criarAnotacao(anotacao) {
  return await request({
    url: '/api/diario/',
    method: 'post',
    data: anotacao,
    loading: "hourglass"
  })
}

export async function editarAnotacao(anotacao) {
  return await request({
    url: `/api/diario/${anotacao.id}/`,
    method: 'put',
    data: anotacao,
    loading: 'hourglass'
  })
}

export async function excluirAnotacao(id) {
  return await request({
    url: `/api/diario/${id}/`,
    method: 'delete',
    loading: 'hourglass'
  })
}

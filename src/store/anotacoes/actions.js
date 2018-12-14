import {criarAnotacao, editarAnotacao, excluirAnotacao, getAnotacao, getAnotacoes} from '../../services/anotacoes'

export async function anotacoes({dispatch, commit}, parametros) {
  commit('getAnotacoesRequest')
  const retorno = await getAnotacoes(parametros.query)
  if (retorno) {
    commit('getAnotacoesEncontrados', retorno)
    commit('getAnotacoesPagination', parametros.pagination)
  }
}

export async function anotacao({dispatch, commit}, anotacaoId) {
  commit('getAnotacaoRequest')
  const retorno = await getAnotacao(anotacaoId)
  if (retorno) {
    commit('getAnotacaoEncontrada', retorno)
  }
}

export async function removerAnotacao({dispatch, commit}, anotacaoId) {
  commit('removerAnotacaoRequest')
  await excluirAnotacao(anotacaoId)
    .then(res => {
      commit('removerAnotacaoSucesso')
    }).catch(e => {
      commit('removerAnotacaoErro')
    })
}

export async function addAnotacao({dispatch, commit}, anotacao) {
  commit('addAnotacaoRequest')
  await criarAnotacao(anotacao)
    .then(res => {
      commit('addAnotacaoSucesso')
    }).catch(e => {
      commit('addAnotacaoErro')
    })
}

export async function editAnotacao({dispatch, commit}, anotacao ) {
  commit('editAnotacaoRequest')
  await editarAnotacao(anotacao)
    .then(res => {
      commit('editAnotacaoSucesso')
    }).catch(e => {
      commit('editAnotacaoErro')
    })
}

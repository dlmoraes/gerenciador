export function getAnotacoesRequest(state) {
  console.log('getAnotacoesRequest')
  state.loading = true
}

export function getAnotacoesEncontrados(state, anotacoes) {
  console.log('getAnotacoesEncontrados')
  state.anotacoes = anotacoes
  state.serverData = anotacoes.data.results
}

export function getAnotacoesPagination(state, pagination) {
  console.log('getAnotacoesPagination')
  state.serverPagination = pagination
  state.serverPagination.rowsNumber = state.anotacoes.data.count
  state.loading = false
}

export function getAnotacaoRequest(state) {
  console.log('getAnotacaoRequest')
}

export function getAnotacaoEncontrada(state, anotacao) {
  console.log('getAnotacaoEncontrada', anotacao.data)
  state.anotacao = anotacao.data
}

export function removerAnotacaoRequest(state) {
  console.log('removerAnotacaoRequest')
}

export function removerAnotacaoSucesso(state) {
  console.log('removerAnotacaoSucesso')
  state.removido = true
}

export function removerAnotacaoErro(state) {
  console.log('removerAnotacaoErro')
  state.removido = false
}

export function addAnotacaoRequest(state) {
  console.log('addAnotacaoRequest')
  state.loading = true
}

export function addAnotacaoSucesso(state) {
  console.log('addAnotacaoSucesso')
  state.loading = false
  state.criado = true
}

export function addAnotacaoErro(state) {
  console.log('addAnotacaoErro')
  state.loading = false
}

export function editAnotacaoRequest(state) {
  console.log('editAnotacaoRequest')
}

export function editAnotacaoSucesso(state) {
  state.editado = true
}

export function editAnotacaoErro(state) {
  state.editado = false
}

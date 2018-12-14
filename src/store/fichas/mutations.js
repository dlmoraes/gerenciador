
export function fichasRequest(state) {
  console.log('fichasRequest')
}

export function alvosEncontrados(state, fichas) {
  state.fichas = fichas
}

export function mostrarOpcoesFichas(state) {
  console.log('mostrarOpcoesFichas')
  state.buscarAlvos = false
  state.mostrarOpcoes = true
}

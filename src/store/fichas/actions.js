import {fichas} from "../../services/fichas";

export async function getFichas({dispatch, commit}, query) {
  commit('fichasRequest')
  const retorno = await fichas(query)
  if (retorno) {
    commit('alvosEncontrados', await retorno)
    commit('mostrarOpcoesFichas')
  }
}

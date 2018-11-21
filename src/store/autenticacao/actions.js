import {autenticacaoService} from "../../services/autenticacao.service";

export function login({ dispatch, commit }, { login, password }) {
  commit('loginRequest', { login });

  autenticacaoService.login(login, password)
    .then(
      user => {
        commit('loginSuccess', user);
        this.$router.push('/');
      },
      error => {
        commit('loginFailure', error);
      }
    );
}
export function logout({ commit }) {
  autenticacaoService.logout();
  commit('logout');
}

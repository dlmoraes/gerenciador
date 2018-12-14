import { Notify } from 'quasar'
import { API_URL } from "../config";
import {setToken, removeToken} from "../libs/auth";


export const autenticacaoService = {
  login,
  logout
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${API_URL}/auth/`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        setToken(JSON.stringify(user));
      }
      return user;
    })
    .catch(error => {
      if (!error.response) {
        Notify.create('Ocorreu um erro de serviço, favor tente mais tarde...')
      }
      return Promise.reject(error)
    })
}

function logout() {
  // remove user from local storage to log user out
  removeToken();
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

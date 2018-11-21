export function authHeader() {
  let usuario = JSON.parse(localStorage.getItem('user'))
  if (usuario && usuario.token) {
    return {
      'Authorization': 'Token ' + usuario.token
    }
  } else {
    return {}
  }
}

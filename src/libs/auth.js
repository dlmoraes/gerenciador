
const TokenKey = 'user'

export function getToken() {
  let tk = JSON.parse(localStorage.getItem(TokenKey))
  return tk.token
}

export function setToken(token) {
  localStorage.setItem(TokenKey,token)
}

export function removeToken() {
  localStorage.removeItem(TokenKey)
}

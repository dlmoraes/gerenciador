import axios from 'axios'
import Router from '../router';
import { getToken, removeToken } from "./auth"
import loading from './loading'
import { Notify } from 'quasar'
import {API_URL} from "../config";

// create an axios instance
const service = axios.create({
  baseURL: API_URL, // api的base_url
  timeout: 20000 // request timeout
})

const statusPositive = [200, 201, 204]

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (!permission.check(config)) {
  //   Notify.create({
  //     message: this.$t("Sem permissão")
  //   })
  //   throw "403"
  // }
  loading.show(config)
  let token = getToken()
  if (token) {
    config.headers['Authorization'] = 'Token ' + token// 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  console.log('Interceptador de Token => Concluido')
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  async response => {
    loading.hide(response.config)
    const res = await response.data;
    console.log('Interceptador de Resposta => ', response)
    if (!statusPositive.includes(response.status)) {
      Notify.create({
        message: res.msg
      })
      return await Promise.reject('error');
    } else {

      return await response;
    }
  },
  error => {
    loading.hide(error.config)
    if (error.response && error.response.status === 401) {
      // removeToken();
      if (error.config.url.indexOf("logout") === -1) {
        Notify.create({
          message: 'Login expirado!'
        })
      }
      setTimeout(() => {
        Router.push({
          name: "login"
        });
      }, 1000)

    } else if (error.response && error.response.status === 500) {
      Notify.create({
        message: 'Erro de Sistema' + '!',
        position: 'bottom-right'
      })
    } else if (error.message.indexOf("timeout")>-1) {
      Notify.create({
        message: 'Estorou o tempo limite da rede' + '!',
        position: 'bottom-right'
      })
    }
    else if (error == "403") {

    } else {
      Notify.create({
        message: 'Erro na Rede!',
        position: 'bottom-right'
      })
    }
    return Promise.reject(error)

  })

export default service




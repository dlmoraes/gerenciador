const routes = [
  {
    path: '/login',
    component: () => import('pages/autenticacao/Login.vue')
    // component: () => import('pages/autenticacao/Autenticacao.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
      {
        path: 'diario_bordo/anotacoes',
        name: 'anotacoes_diario_bordo',
        component: () => import('pages/diario_bordo/Anotacoes.vue')
      },
      {
        path: 'diario_bordo/anotacoes/nova',
        name: 'nova_anotacao_diario_bordo',
        component: () => import('pages/diario_bordo/CadastroAnotacao.vue')
      },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

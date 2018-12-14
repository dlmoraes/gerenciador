const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/autenticacao/Login.vue')
  },
  {
    path: '/fichasnegociacao',
    name: 'fichasnegociacao',
    component: () => import('pages/fichas/Ficha.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('layouts/MyLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: "home_index",
        component: () => import('pages/Index.vue'),
        meta: {
          titulo: 'Home',
          breadcrumb: ['Home']
        }
      },
      {
        path: 'diario_bordo/anotacoes',
        name: 'anotacoes_diario_bordo',
        component: () => import('pages/diario_bordo/Anotacoes.vue'),
        meta: {
          titulo: 'Diário de Bordo',
          breadcrumb: ['Home', 'Diario de Bordo', 'Gestão']
        }
      },
      {
        path: 'diario_bordo/anotacoes/nova',
        name: 'nova_anotacao_diario_bordo',
        component: () => import('pages/diario_bordo/CadastroAnotacao.vue'),
        meta: {
          titulo: 'Nova Anotação',
          breadcrumb: ['Home', 'Diario de Bordo', 'Gestão', 'Editor de Anotações'],
        }
      },
      {
        path: 'diario_bordo/anotacoes/edicao/:id',
        name: 'editar_anotacao_diario_bordo',
        component: () => import('pages/diario_bordo/EditarAnotacao.vue'),
        meta: {
          titulo: 'Editor de Anotações',
          breadcrumb: ['Home', 'Diario de Bordo', 'Gestão', 'Editor de Anotações'],
        }
      },
      {
        path: 'alvos/fichas',
        name: 'alvos_fichas',
        component: () => import('pages/fichas/Fichas.vue'),
        meta: {
          titulo: 'Fichas de Negociação',
          breadcrumb: ['Home', 'Fichas de Negociação', 'Gestão']
        }
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

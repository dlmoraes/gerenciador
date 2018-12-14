<template>
  <q-layout>
    <q-layout-header v-model="header" :reveal="headerReveal" class="print-hide">
      <q-toolbar color="dark" no-shadow :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          <div class="row items-center">
            <div class="col-xs-6 col-md-2">
              Gerenciador App
            </div>
            <div class="col-xs-6 col-md-4">
              <q-btn flat round icon="menu" @click="left = !left">
                <q-tooltip>
                  Mostrar/Ocultar Menu
                </q-tooltip>
              </q-btn>
              &nbsp &nbsp &nbsp;
            </div>
          </div>
        </q-toolbar-title>
        <img alt="avatar" src="~assets/avatar.gif" class="avatar_usuario"/>
        <q-btn flat icon="exit_to_app" @click="logOut">
          <q-tooltip>
            Sair do sistema
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-footer v-model="footer" :reveal="footerReveal" class="print-hide">
      <q-toolbar inverted>
        <q-toolbar-title class="text-black q-caption text-weight-medium">
          © 2018. Gerenciador Web App
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-footer>

    <q-layout-drawer
      side="left"
      v-model="left"
      :overlay="leftOverlay"
      :behavior="leftBehavior"
      :breakpoint="leftBreakpoint"
      content-class="escuro_menu print-hide"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <!--Menu-->
      <q-scroll-area class="fit">
        <q-list no-border>
          <q-item style="padding:10px">
            <q-item-side avatar color="primary">
              <q-item-tile avatar>
                <img src="statics/boy-avatar.png">
              </q-item-tile>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>Diego</q-item-tile>
            </q-item-main>
          </q-item>
          <q-list-header class="text-gray">Menu</q-list-header>
          <q-item class="text-white" :to="{ name: 'alvos_fichas' }">
            <q-item-side class="text-white" icon="business_center"/>
            <q-item-main class="text-white" label="Fichas de Negociação"/>
          </q-item>
          <q-item>
            <q-item-side class="text-white" icon="library_books"/>
            <q-item-main label="Organizador de Faturas"/>
          </q-item>
          <q-item link :to="{ name: 'anotacoes_diario_bordo'}" key="anotacoes_diario_bordo">
            <q-item-side class="text-white" icon="assignment"/>
            <q-item-main>
              <q-item-tile class="text-white" label>Diário de Bordo</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
      <div class="row print-hide">
        <div class="col cabecalho_pagina header-elements-md-inline">
          <div class="container_cabecalho_pagina header-elements-md-inline">
            <div class="titulo_pagina">
              <h6 class="no-margin">
                <span class="text-weight-medium">{{tituloPagina}}</span>
              </h6>
            </div>
          </div>
          <div class="breadcrumb">
            <breadcrumbs :current-path="list"></breadcrumbs>
          </div>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
  import {openURL} from 'quasar'
  import {colors} from 'quasar'
  import Breadcrumbs from "../components/Breadcrumbs";
  import {getToken} from "../libs/auth";

  colors.setBrand('dark', '#35434a');

  export default {
    components: {Breadcrumbs},
    data() {
      return {
        miniState: true,
        header: true,
        headerReveal: true,

        left: true,
        leftOverlay: false,
        leftBehavior: "default",
        leftBreakpoint: 992,

        shrinkMenu: false,

        right: false,
        rightOverlay: false,
        rightBehavior: "default",
        rightBreakpoint: 100,

        footer: false,
        footerReveal: true,
      }
    },
    computed: {
      tituloPagina() {
        return this.$route.meta.titulo
      },
      list() {
        return this.$route.meta.breadcrumb
      }
    },
    methods: {
      logOut() {
        this.$store
          .dispatch("autenticacao/logout")
          .then(() => {
            this.$router.push({
              name: "login"
            });
          })
          .catch(ex => {
          });
      }
    },
    created() {
      try {
        let token = getToken()
        if (!token) {
          this.$router.push('/login')
        }
      } catch (e) {
        this.$router.push('/login')
      }
    }
  }
</script>

<style>
  .fade-enter-active,
  .fade-enter {
    -webkit-animation: moveFromRight 0.5s both ease;
    animation: moveFromRight 0.5s both ease;
  }

  .fade-leave-to,
  .fade-leave-active {
    -webkit-animation: moveToLeft 0.5s both ease;
    animation: moveToLeft 0.5s both ease;
  }

  @-webkit-keyframes moveToLeft {
    from {
    }
    to {
      opacity: 0.5;
      -webkit-transform: translateX(-100%);
    }
  }

  @keyframes moveToLeft {
    from {
    }
    to {
      opacity: 0.5;
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }

  @-webkit-keyframes moveFromRight {
    from {
      opacity: 0.7;
      -webkit-transform: translateX(100%);
    }
  }

  @keyframes moveFromRight {
    from {
      opacity: 0.7;
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
  }

  @media (min-width: 768px)

    .header-elements-md-inline {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
    }
</style>

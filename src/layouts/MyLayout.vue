<template>
  <q-layout :view="view">
    <q-layout-header v-model="header" :reveal="headerReveal">
      <q-toolbar color="dark" no-shadow :inverted="$q.theme === 'ios'">
        <q-btn flat round icon="menu" @click="left = !left" />
        <q-btn flat round :icon="miniState?'keyboard_arrow_right':'keyboard_arrow_left'" @click="miniState = !miniState" /> &nbsp;&nbsp;&nbsp;
        <q-toolbar-title>
          Gerenciador
        </q-toolbar-title>
        <!--<q-btn flat dense v-if="!$q.platform.within.iframe" class="q-mr-sm" label="Go to Showcase"-->
        <!--@click="$router.replace('/showcase')"/>-->
        <img alt="Quasar logo" src="~assets/avatar.gif" class="avatar_usuario">
        <!--<q-btn flat round dense icon="menu" @click="right = !right" aria-label="Toggle menu on right side"/>-->
      </q-toolbar>
      <!--<demo-tabs v-if="$q.theme === 'mat'"/>-->
    </q-layout-header>

    <q-layout-footer v-model="footer" :reveal="footerReveal">
      <!--<demo-tabs v-if="$q.theme === 'ios'"/>-->
      <q-toolbar inverted>
        <!--<q-btn flat round dense icon="menu" @click="left = !left" aria-label="Toggle menu on left side"/>-->
        <q-toolbar-title class="text-black q-caption text-weight-medium">
          © 2018. Gerenciador Web App
        </q-toolbar-title>
        <!--<q-btn flat round dense icon="menu" @click="right = !right" aria-label="Toggle menu on right side"/>-->
      </q-toolbar>
    </q-layout-footer>

    <q-layout-drawer
      side="left"
      v-model="left"
      :overlay="leftOverlay"
      :behavior="leftBehavior"
      :breakpoint="leftBreakpoint"
      content-class="escuro_menu"
      :mini="miniState"
      @click.capture="drawerClick"
    >
      <q-scroll-area class="fit">
        <!--<div class="row flex-center escuro_menu text-white">-->
          <!--<div style="padding-right: 2rem;">-->
            <!--<img alt="Quasar logo" src="~assets/quasar-logo-full.svg"-->
                 <!--style="height: 46px; width: 46px">-->
          <!--</div>-->
        <!--</div>-->
        <q-list no-border>
          <q-item v-show="!miniState" style="padding:10px">
            <q-item-side avatar color="primary">
              <q-item-tile avatar>
                <img src="statics/boy-avatar.png">
              </q-item-tile>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>Diego</q-item-tile>
            </q-item-main>
            <!--<q-item-side right>-->
              <!--<q-btn push round color="secondary" size="xs" icon="navigation" />-->
              <!--<q-btn push rounded color="purple" size="xs" label="exit" />-->
            <!--</q-item-side>-->
          </q-item>
          <q-item v-show="miniState" style="padding:10px">
            <q-item-side avatar color="primary">
              <q-item-tile avatar>
                <img src="statics/boy-avatar.png">
              </q-item-tile>
              <q-popover anchor="top right" self="top left">
                <q-list link style="min-width: 100px">
                  <q-list-header>Diego</q-list-header>
                  <q-item>
                    <q-item-main label="User info" />
                  </q-item>
                  <q-item>
                    <q-item-main label="Logout" />
                  </q-item>
                </q-list>
              </q-popover>
            </q-item-side>
          </q-item>
          <q-list-header class="text-gray">Menu</q-list-header>
          <q-item @click.native="openURL('http://quasar-framework.org')">
            <q-item-side class="text-white" icon="business_center"/>
            <q-item-main label="Fichas de Negociação"/>
          </q-item>
          <q-item @click.native="openURL('http://quasar-framework.org')">
            <q-item-side class="text-white" icon="library_books"/>
            <q-item-main label="Organizador de Faturas"/>
          </q-item>
          <q-item :to="{ name: 'anotacoes_diario_bordo'}">
            <q-item-side class="text-white" icon="assignment"/>
            <q-item-main label="Diário de Bordo"/>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-layout-drawer>

    <!--<q-layout-drawer-->
    <!--side="right"-->
    <!--v-model="right"-->
    <!--:overlay="rightOverlay"-->
    <!--:behavior="rightBehavior"-->
    <!--:breakpoint="rightBreakpoint"-->
    <!--:content-class="$q.theme === 'mat' ? 'bg-grey-3' : null"-->
    <!--:content-style="{fontSize: '16px'}"-->
    <!--&gt;-->
    <!--<q-list-header>Right Panel</q-list-header>-->
    <!--<div v-if="scrolling" style="padding: 25px 16px 16px;">-->
    <!--<p class="caption" v-for="n in 50" :key="`right-${n}`">-->
    <!--<em>Right Panel has intended scroll</em>-->
    <!--</p>-->
    <!--</div>-->
    <!--</q-layout-drawer>-->

    <q-page-container>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
  import DemoTabs from 'components/demo-tabs'
  import {mapState, mapGetters} from 'vuex'
  import {openURL} from 'quasar'
  import {colors} from 'quasar'

  colors.setBrand('dark', '#35434a');

  export default {
    data () {
      return {
        miniState: true
      }
    },
    components: {
      DemoTabs
    },
    computed: {
      header: {
        get() {
          return this.$store.state.layoutDemo.header
        },
        set(val) {
          this.$store.commit('layoutDemo/setHeader', val)
        }
      },
      footer: {
        get() {
          return this.$store.state.layoutDemo.footer
        },
        set(val) {
          this.$store.commit('layoutDemo/setFooter', val)
        }
      },
      left: {
        get() {
          return this.$store.state.layoutDemo.left
        },
        set(val) {
          this.$store.commit('layoutDemo/setLeft', val)
        }
      },
      right: {
        get() {
          return this.$store.state.layoutDemo.right
        },
        set(val) {
          this.$store.commit('layoutDemo/setRight', val)
        }
      },
      ...mapGetters('layoutDemo', ['view']),
      ...mapState('layoutDemo', [
        'headerReveal', 'footerReveal',
        'leftOverlay', 'leftBehavior', 'leftBreakpoint',
        'rightOverlay', 'rightBehavior', 'rightBreakpoint',
        'scrolling'
      ])
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
</style>

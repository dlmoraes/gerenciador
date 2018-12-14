<template>
  <q-list
    no-border
    link
    inset-delimiter
  >
    <q-list-header>Menu Principal</q-list-header>
    <q-item @click.native="openURL('http://quasar-framework.org')">
      <q-item-side icon="business_center"/>
      <q-item-main label="Fichas de Negociação"/>
    </q-item>
    <q-item @click.native="openURL('http://quasar-framework.org')">
      <q-item-side icon="library_books"/>
      <q-item-main label="Organizador de Faturas"/>
    </q-item>
    <q-item :to="{ name: 'anotacoes_diario_bordo'}">
      <q-item-side icon="assignment"/>
      <q-item-main label="Diário de Bordo"/>
    </q-item>
  </q-list>
</template>

<script>
  import {openURL} from 'quasar'

  export default {
    name: "Menu"
  }
</script>

<style scoped>

</style>

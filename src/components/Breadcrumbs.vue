<template>
  <q-breadcrumbs active-color="black" color="grey-6">
    <template v-for="item in currentPath">
      <q-breadcrumbs-el v-if="item === 'Home'" icon="home" :to="{ name: 'home_index' }" :label="item"/>
      <q-breadcrumbs-el v-else :label="item" v-ripple/>
    </template>

  </q-breadcrumbs>
</template>

<script>
  export default {
    name: "Breadcrumbs",
    props: {
      currentPath: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style>
  .q-breadcrumbs {
    border-color: #ddd;
    border-top: 1px solid transparent;
  }
  .q-breadcrumbs-el {
    font-weight: normal;
    font-size: .8125rem;
  }
</style>

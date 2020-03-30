<template>
  <div id="app">
    <Navigation/>
    <router-view/>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation.vue'

  export default {
    name: 'App',
    components: {
      Navigation
    }
  }
</script>

<style>
@import './assets/style/App.css';
</style>

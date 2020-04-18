<template>
  <div id="app" v-bind:style="{ backgroundColor: color}">
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
    },
    data() {
      return {
      color: '#673AB7'
      }
    }
  }
</script>

<style>
@import './assets/style/App.css';
</style>

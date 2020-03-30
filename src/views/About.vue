<template>
  <div class="container">
    <div class="row">
      <div class="w-25 p-3 mb-1 bg-secondary text-light">
        Liste
          <List/>
      </div>
      <div class="w-75 p-3 mb-1 bg-secondary text-light">
        Formulaire
          <Dev/>
      </div>
    </div>
    <Call/>
  </div>
</template>

<script>
// @ is an alias to /src
import Dev from '@/components/Dev.vue'
import List from '@/components/List.vue'
import Call from '@/components/CallAPI.vue'

export default {
  name: 'About',
  components: {
    Dev,
    List,
    Call
  }
}
</script>

<style scoped>
.container {
    background-color: lightblue;
}
</style>
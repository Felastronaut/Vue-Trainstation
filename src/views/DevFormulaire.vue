<template>
  <div class="container">
    <div class="row">
      <div class="mcol bg-secondary text-light">
        Formulaire
          <Dev/>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Dev from '@/components/Dev.vue'

export default {
  name: 'About',
  components: {
    Dev
  }
}
</script>

<style scoped>
.container {
    background-color: lightblue;
}
</style>
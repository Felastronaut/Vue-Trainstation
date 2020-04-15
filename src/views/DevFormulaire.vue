<template>
  <div class="container">
      <div class="">
          <Dev/>
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
    background-color: rgb(143, 166, 196);
}
</style>
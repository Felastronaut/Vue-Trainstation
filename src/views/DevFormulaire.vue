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
  components: {
    Dev
  }
}
</script>

<style scoped>
.container {
    background-color: rgb(187, 187, 187);
}
</style>
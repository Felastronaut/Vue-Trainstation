<template>
  <div class="container">
      <div class="">
          <Dev/>
          <ResultVoyage/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Dev from '@/components/Dev.vue'
import ResultVoyage from '@/components/ResultVoyage.vue'

export default {
  components: {
    Dev,
    ResultVoyage
  }
}
</script>

<style scoped>
.container {
    background-color: rgb(143, 166, 196);
}
</style>
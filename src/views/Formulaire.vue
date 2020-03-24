<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        Formulaire
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <Trains/>
      </div>
    </div>
  </div>
</template>

<script>
import Trains from '@/components/Trains.vue'

export default {
  name: 'Formulaire',
  components: {
    Trains
  }
}
</script>

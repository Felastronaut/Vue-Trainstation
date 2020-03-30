<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        Dev API call SNCF
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <CallSNCF/>
      </div>
    </div>
  </div>
</template>

<script>
import CallSNCF from '@/components/CallSNCF.vue'

export default {
  name: 'Formulaire',
  components: {
    CallSNCF
  }
}
</script>

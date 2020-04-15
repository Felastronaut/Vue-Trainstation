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
        <br>
        <TestSoap/>
      </div>
    </div>
  </div>
</template>

<script>
import CallSNCF from '@/components/CallSNCF.vue'
import TestSoap from '@/components/TestSoap.vue'

export default {
  name: 'Formulaire',
  components: {
    CallSNCF,
    TestSoap
  }
}


</script>

<template>
    <div class="List">
        <div class="col">
        <p>Date departure</p>
        <p>Time for departure</p>
        <p>Location departure</p>
        <p>Location arrival</p>
        <p>Your currency</p>
        </div>
    </div>   
</template>

<script>
export default {
  name: 'List',
  data() { 
      return { text1: '5' }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.List {
    background-color: rgba(0,0,255,.1);
}
</style>

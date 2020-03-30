<template>
<div id="app">
  <h1>Bitcoin Price Index</h1>
  <div v-for="currency in info" v-bind:key="currency.id" class="currency">
    {{ currency.description }}:
    <span class="lighten">
      <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
    </span>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Trains',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response.data.bpi))
      .catch(error => console.log(error))
  },
  filters: {
  currencydecimal (value) {
    return value.toFixed(2)
  }
},
}

</script>

<style scoped>
</style>

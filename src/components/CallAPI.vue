<template>
<div id="app">
  <h1>Bitcoin Price Index</h1>

  <section v-if="errored">
    <p>Nous sommes désolés, nous ne sommes pas en mesure de récupérer ces informations pour le moment. Veuillez réessayer ultérieurement.</p>
  </section>

  <section v-else>
    <div v-if="loading">Chargement...</div>

    <div v-for="currency in info" v-bind:key="currency.id" class="currency">
      {{ currency.description }}:
      <span class="lighten">
        <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
      </span>
    </div>

  </section>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Trains',
  data () {
    return {
      info: null,
      loading: true,
      errored: false
    }
  },

  filters: {
  currencydecimal (value) {
    return value.toFixed(2)
    }
  },

  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        this.info = response.data.bpi
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  },
}

</script>

<style scoped>
</style>

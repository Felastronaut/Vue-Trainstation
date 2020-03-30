<template>
<div id="app">
  <h1>Call SNCF</h1>
  <div class=form-test>
      <label class="sr-only" for="depart">Departure</label>
        <b-input
            id="depart"
            placeholder="Departure"
            v-model="depart"/>
  </div>
        <b-button variant="primary" @click="mounted">Rechercher</b-button>
  <section v-if="errored">
    <p>Nous sommes désolés, nous ne sommes pas en mesure de récupérer ces informations pour le moment. Veuillez réessayer ultérieurement.</p>
  </section>

  <section v-else>
    <div v-if="loading">Chargement...</div>

    <div id="app">
      {{ info }}
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
      errored: false,
      authStr: '',
      depart: ''
    }
  },

  filters: {
  currencydecimal (value) {
    return value.toFixed(2)
    }
  },

  methods: {
        mounted () {
        
        axios
        .get(`https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=${this.depart}`, { headers: { Authorization: '3b036afe-0110-4202-b9ed-99718476c2e0' } })
        .then(response => {
            this.info = response
        })
        .catch(error => {
            console.log(error)
            this.errored = true
        })
        .finally(() => this.loading = false),
        console.log( 'Tu as cliqué ' + this.depart )
    },
  }
}

</script>

<style scoped>
</style>

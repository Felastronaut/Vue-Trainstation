<template>
  <div id="app">
    <b-button @click="retourEtape()" v-if="etape > 0">
      Retour
    </b-button>
    <br>
    <div class="etape0" v-if="etape == 0">
      <h1>Call SNCF</h1>
      <div class=form-test>
          <label class="sr-only" for="depart">Departure</label>
            <b-input
                id="depart"
                placeholder="Departure"
                v-model="depart"/>
      </div>
            <b-button variant="primary" @click="searchGare()">Rechercher</b-button>
      <section v-if="errored">
        <p>Nous sommes désolés, nous ne sommes pas en mesure de récupérer ces informations pour le moment. Veuillez réessayer ultérieurement.</p>
      </section>

      <section v-else>
        <div v-if="loading">Chargement...</div>

        <div v-for="info in infos" :key="info.recordid" class="col-md-12">
          <b-button @click="recupGare(info)">
            {{ info.fields.gare_ut_libelle }}
          </b-button><br>
        </div>

      </section>
    </div>
    <div class="etape1" v-if="etape == 1">
      Vous avez sélectionné la gare {{gareselected.fields.gare_ut_libelle}}
    </div>
    <div class="etape1" v-else>
      Vous n'avez pas sélectionné la gare
    </div>

    <div class="etape1" v-if="etape == 2">
      Vous avez sélectionné la gare {{gareselected.fields.gare_ut_libelle}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Trains',
  data () {
    return {
      infos: [],
      loading: false,
      errored: false,
      authStr: '',
      depart: 'Annecy',
      etape: 0,
      gareselected: ''
    }
  },

  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },

  methods:{
    retourEtape(){
      if(this.etape > 0){
        this.etape = this.etape - 1
      }
    },
    recupGare(info) {
      this.etape = 1
      this.gareselected = info
    },
    searchGare() {
      this.loading = true
      axios
      .get(`https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=${this.depart}&lang=FR&rows=3`, { headers: { Authorization: '3b036afe-0110-4202-b9ed-99718476c2e0' } })
      .then(response => {
          this.infos = response.data.records
          console.log(this.infos)
      })
      .catch(error => {
          console.log(error)
          this.errored = true
      })
      .finally(() => this.loading = false)
    },
  }
}

</script>

<style scoped>
</style>

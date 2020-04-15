<template>
  <b-form>
    <div class="form">
      <b-form-group label="Currency">
        <b-form-radio-group
          v-model="selectedCurrency"
          :options="currencies"
          plain
          name="plain-inline"
        ></b-form-radio-group>
      </b-form-group>

      <div class="input_wrapper">
        <label for="date">Date of departure</label>
        <b-form-datepicker id="date" :state="false" :min="minDate" v-model="date"/>
      </div>

      <div class="input_wrapper">
        <label for="time">Time</label>
        <b-form-timepicker id="time" v-model="time" />
      </div>

      <div class="input_wrapper">
        <label for="depart">Départ</label>
        <b-form-input list="depart" v-model="depart" @input="searchGare('dep', depart)"/>
        <datalist id="depart">
          <option v-if="loading">Chargement...</option>
          <option v-for="info in infosdepart" :key="info.recordid">{{info.fields.gare_ut_libelle}}</option>
        </datalist>
      </div>

      <div class="input_wrapper">
        <label for="arrivee">Arrivé</label>
        <b-form-input list="arrivee" v-model="arrivee" @input="searchGare('arr', arrivee)"/>
        <datalist id="arrivee">
          <option v-if="loading">Chargement...</option>
          <option v-for="info in infosarrivee" :key="info.recordid">{{info.fields.gare_ut_libelle}}</option>
        </datalist>
      </div>
      
      <div class="input_wrapper">
        <b-button variant="primary" @click="rechercher(date, time)">Rechercher</b-button>
        <span>{{voyage}}</span>
      </div>

    </div>
  </b-form>
</template>




<script>
import axios from "axios";
import moment from "moment";


export default {
  name: "Trains",
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    return {
      infosdepart: [],
      infosarrivee: [],
      loading: false,
      errored: false,
      expandStats: {
        depart: false,
        arrival: false
      },
      authStr: "",
      etape: 0,
      gareselected: "",
      depart: "",
      arrivee: "",
      date: "",
      time: "",
      currencies: [
        { text: 'EUR', value: 'EUR' },
        { text: 'CHF', value: 'CHF' },
        { text: 'USD', value: 'USD' }
      ],
      selectedCurrency: 'EUR',
      apiinfo: '',
      voyage: '',
      minDate: minDate
    };
  },

  filters: {
  },

  methods: {

    rechercher(date, time) {
      time = time.split(':')
      date = new Date(date)
      date = moment(date).format('YYYYMMDD')
      const datetime = date+'T'+time[0]+time[1]+time[2]
      const depcoord = this.infosdepart[0].geometry.coordinates
      const arrcoord = this.infosarrivee[0].geometry.coordinates
      this.loading = true;
      console.log(`https://api.sncf.com/v1/coverage/sncf/journeys?from=${depcoord[0]};${depcoord[1]}&to=${arrcoord[0]};${arrcoord[1]}&datetime=${datetime}`)
      axios
        .get(
          `https://api.sncf.com/v1/coverage/sncf/journeys?from=${depcoord[0]};${depcoord[1]}&to=${arrcoord[0]};${arrcoord[1]}&datetime=${datetime}`,
          { headers: { Authorization: "cb48489b-567a-4458-8525-517390fb1220" } }
        )
        .then(response => {
          this.voyage = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));

    },
    calculVoyage(){

    },
    retourEtape() {
      if (this.etape > 0) {
        this.etape = this.etape - 1;
      }
    },
    recupGare(info) {
      this.etape = 1;
      this.gareselected = info;
      console.log("T'as cliqué"  + this.gareselected)
    },
    searchGare(type, gare) {
      this.loading = true;
      axios
        .get(
          `https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=${gare}&lang=FR&rows=3`,
          { headers: { Authorization: "3b036afe-0110-4202-b9ed-99718476c2e0" } }
        )
        .then(response => {
          console.log(response.data.records);
          if(type == 'dep'){
            this.infosdepart = response.data.records;
          }
          else if(type == 'arr'){
            this.infosarrivee = response.data.records;
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
  }
};
</script>





<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input_wrapper {
  position: relative;
  margin: 1rem 0;
}
</style>

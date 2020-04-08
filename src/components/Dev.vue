<template>
  <b-form>
    <div class="form">

      <div class="input_wrapper">
        <label class="sr-only" for="date">Date of departure</label>
        <b-input id="date" type="date" v-model="date" />
      </div>

      <div class="input_wrapper">
        <label class="sr-only" for="time">Time</label>
        <b-input id="time" type="time" v-model="time" />
      </div>

      <div class="input_wrapper">
        <label class="sr-only" for="depart">Departure</label>
        <b-input
          id="depart"
          @keypress="searchGareDepart()"
          placeholder="Departure"
          ref="depart"
          v-model="depart"
        />
        <div v-if="infosdepart" id="depart-list">
          <div v-if="loading">Chargement...</div>
          <b-dropdown-item v-for="info in infosdepart" :key="info.recordid">{{ info.fields.gare_ut_libelle }}</b-dropdown-item>
        </div>
      </div>

      <div class="input_wrapper">
        <label class="sr-only" for="arrivee">Arrival</label>
        <b-input
          id="arrivee"
          @keyup="searchGareArrivee()"
          placeholder="Arrival"
          ref="arrival"
          v-model="arrivee"

        />
        <div v-if="infosarrivee" id="arrival-list">
          <b-dropdown-item v-for="info in infosarrivee" :key="info.recordid">{{ info.fields.gare_ut_libelle }}</b-dropdown-item>
        </div>
      </div>

      <div class="input_wrapper">
        <label class="sr-only" for="arrivee">Currency</label>
        <b-input id="currency" placeholder="Currency" v-model="currency" />
      </div>
      
      <div class="input_wrapper">
        <b-button variant="primary" @click="rechercher">Rechercher</b-button>
        <span>{{voyage}}</span>
      </div>
    </div>
  </b-form>
</template>




<script>
import axios from "axios";

export default {
  name: "Trains",
  data() {
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
      currency: "",
      apiinfo: undefined
    };
  },

  filters: {
  },

  methods: {

    rechercher() {
      console.log("Date : " + this.date);
      console.log("Time : " + this.time);
      console.log("Departure : " + this.depart);
      console.log("Arrival : " + this.arrivee);
      console.log("Arrival : " + this.currency);
      console.log("Your trip is " + this.voyage);
    },
    retourEtape() {
      if (this.etape > 0) {
        this.etape = this.etape - 1;
      }
    },
    recupGare(info) {
      this.etape = 1;
      this.gareselected = info;
    },
    searchGareDepart() {
      this.loading = true;
      axios
        .get(
          `https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=${this.depart}&lang=FR&rows=3`,
          { headers: { Authorization: "3b036afe-0110-4202-b9ed-99718476c2e0" } }
        )
        .then(response => {
          this.infosdepart = response.data.records;
          console.log(this.infosdepart);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },

    searchGareArrivee() {
      this.loading = true;
      axios
        .get(
          `https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=${this.arrivee}&lang=FR&rows=3`,
          { headers: { Authorization: "3b036afe-0110-4202-b9ed-99718476c2e0" } }
        )
        .then(response => {
          this.infosarrivee = response.data.records;
          console.log(this.infosarrivee);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  },

  computed: {
    voyage() {
      return (
        this.depart +
        " -> " +
        this.arrivee +
        " the " +
        this.date +
        " at " +
        this.time
      );
    }
  }
};
</script>





<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input_wrapper {
  position: relative;
  margin: 1rem 0;
  z-index: 1;
}
</style>

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
          @keyup="searchGare()"
          @focus="expandDiv()"
          @blur="expandDiv()"
          placeholder="Departure"
          ref="depart"
          v-model="depart"
        />
        <div v-if="infos" class="result_list" id="depart-list">
          <ul>
            <li v-for="info in infos" :key="info.recordid">{{ info.fields.gare_ut_libelle }}</li>
          </ul>
        </div>
      </div>

      <div class="input_wrapper">
        <label class="sr-only" for="arrivee">Arrival</label>
        <b-input
          id="arrivee"
          @focus="expandDiv()"
          @blur="expandDiv()"
          @keyup="searchGare()"
          placeholder="Arrival"
          v-model="arrivee"
          ref="arrival"
        />
        <div v-if="infos" class="result_list" id="arrival-list">
          <ul>
            <li v-for="info in infos" :key="info.recordid">{{ info.fields.gare_ut_libelle }}</li>
          </ul>
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
      infos: [],
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
    expandDiv() {
      const elem = this.$refs;
      this.expandStats[elem] = !this.expandStats[elem];
      document.getElementById("depart-list").style.height = this.expandStats[
        elem
      ]
        ? "200px"
        : "0px";
    },
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
    searchGare() {
      this.loading = true;
      axios
        .get(
          `https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=${this.depart}&lang=FR&rows=3`,
          { headers: { Authorization: "3b036afe-0110-4202-b9ed-99718476c2e0" } }
        )
        .then(response => {
          this.infos = response.data.records;
          console.log(this.infos);
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
.result_list {
  width: 100%;
  height: 0;
  position: relative;
  background: #fff;
  z-index: 2;
  transition: height 0.2s;
  color: #000;
  overflow-y: scroll;
  overflow-x: hidden;
  text-align: left;
}
.result_list ul {
  margin: 0;
  padding: 0;
}
.result_list ul li {
  list-style-type: none;
  padding: 10px 5px;
  border-bottom: 1px solid #eee;
}
.result_list-active {
  height: 200px;
}
</style>

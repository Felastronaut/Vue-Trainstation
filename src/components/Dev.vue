<template>
  <b-form>
    <ul v-if="voyageClique == 0">
      <br><h1><strong>Please select your trip !</strong></h1>
    </ul>
    <div class="form">
      <b-form-group label="Currency">
        <b-form-radio-group
          v-model="selectedCurrency"
          :options="currencies"
          buttons
          size="lg"
          name="radios-btn-default"
        ></b-form-radio-group>
      </b-form-group>


      <div class="input_wrapper">
        <label for="date">Date of departure</label>
        <b-form-datepicker id="date" :min="minDate" v-model="date"/>
      </div>


      <div class="input_wrapper">
        <label for="time">Time</label>
        <b-form-timepicker id="time" v-model="time" />
      </div>


      <div class="input_wrapper">
        <label for="depart">Departure</label>
        <b-form-input list="depart" v-model="depart" @input="searchGare('dep', depart)"/>
        <datalist id="depart">
          <option v-if="loading">Chargement...</option>
          <option v-for="info in infosdepart" :key="info.recordid">{{info.fields.gare_ut_libelle}} ({{info.fields.pltf_departement_numero}})</option>
        </datalist>
      </div>


      <div class="input_wrapper">
        <label for="arrivee">Arrival</label>
        <b-form-input list="arrivee" v-model="arrivee" @input="searchGare('arr', arrivee)"/>
        <datalist id="arrivee">
          <option v-if="loading">Chargement...</option>
          <option v-for="info in infosarrivee" :key="info.recordid">{{info.fields.gare_ut_libelle}} ({{info.fields.pltf_departement_numero}})</option>
        </datalist>
      </div>


      <div class="input_wrapper">
        <ul v-if="voyageClique == 1"> 
              <h1>Your Trip :</h1> From <strong> {{ villeDepart }} </strong> to <strong>  {{ villeArrivee }} </strong> <br><br>


              
              <strong> Distance of your trip </strong> ( SOAP )
              <p v-if="distanceClique == 1"><strong> {{ calculDistance }} Km </strong></p>

              <strong> Price of your Trip</strong>  ( API )
              <p v-if="prixClique == 1"><strong> {{ calculPrix }} {{ selectedCurrency }}</strong> (Price for 1 Km : <strong>{{ factorCurrency }}</strong> {{ selectedCurrency }})</p><br>

              <b-button @click="rechercher(date, time)">Update</b-button>
              <b-button variant="primary" @click="reset()">Reset</b-button>
              <h2>These are next trains departure hours for the time you selected : </h2> 
              <ul>Departure 1 : <strong>{{ departureTime1 }}</strong> for a duration of <strong>{{ timeVoyage1 }} h</strong></ul>

              
        </ul>
        <ul v-if="voyageClique == 0">
            <b-button variant="dark" @click="rechercher(date, time)">Book your Trip</b-button><br><br>
            <h2>//!\\ Please fill in all of the fields //!\\</h2>
            <ul>otherwise it wont work (-:</ul>
        </ul>
      </div>


      <div class="input_wrapper">
      </div>


      <div class="input_wrapper">
        
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
      authStr: "",
      etape: 0,
      gareselected: "",
      depart: "",
      arrivee: "",
      date: "",
      time: "",
      currencies: [
        { text: 'EUR', value: 'EUR', logo: '€' },
        { text: 'CHF', value: 'CHF', logo: 'CHF' },
        { text: 'USD', value: 'USD', logo: '$' },
        { text: 'GBD', value: 'GBD', logo: '£' }
      ],
      selectedCurrency: 'USD',
      factorCurrencies: '',
      factorCurrency: '',
      voyage: '',
      minDate: minDate,
      response: '',
      latarrivee: '',
      longarrivee: '',
      latdepart: '',
      longdepart: '',
      calculDistance: '',
      calculPrix: '',
      prixClique: 0,
      distanceClique: 0,
      voyageClique: 0,
      errorForm: 0,
      villeDepart: '',
      villeArrivee: '',
      voyage1: '',
      timeVoyage1: '',
      departureTime1: ''
    };
  },

  methods: {

    reset(){
      this.voyageClique = 0
    },
    rechercher(date, time) {
      time = time.split(':')
      date = new Date(date)
      date = moment(date).format('YYYYMMDD')
      const datetime = date+'T'+time[0]+time[1]+time[2]
      const depcoord = this.infosdepart[0].geometry.coordinates
      const arrcoord = this.infosarrivee[0].geometry.coordinates
      this.loading = true;
      console.log(`https://api.sncf.com/v1/coverage/sncf/journeys?from=${depcoord[0]};${depcoord[1]}&to=${arrcoord[0]};${arrcoord[1]}&datetime=${datetime}&max_nb_journeys=5`)
      console.log('^^^^^^^^ CALL API SNCF JOURNEY ^^^^^^^^')
      axios
        .get(
          `https://api.sncf.com/v1/coverage/sncf/journeys?from=${depcoord[0]};${depcoord[1]}&to=${arrcoord[0]};${arrcoord[1]}&datetime=${datetime}&max_nb_journeys=5`,
          { headers: { Authorization: "cb48489b-567a-4458-8525-517390fb1220" } }
        )
        .then(response => {
          this.voyage1 = response.data.journeys[0];
          console.log(response.data.journeys);
          console.log('^^^^^^^^ Response API Journey ^^^^^^^^')

          this.departureTime1 = response.data.journeys[0].departure_date_time;
          this.departureTime1 = moment(this.departureTime1).format('LLL');

          this.timeVoyage1 = response.data.journeys[0].duration;
          this.timeVoyage1 = new Date(this.timeVoyage1 * 1000).toISOString().substr(11, 8);

          this.villeDepart = this.infosdepart[0].fields.gare_alias_libelle_noncontraint
          this.villeArrivee = this.infosarrivee[0].fields.gare_alias_libelle_noncontraint
          this.voyageClique = 1
          this.soaprequest()
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));

    },
    
    searchGare(type, gare) {
      this.loading = true;
      axios
        .get(
          `https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=${gare}&lang=FR&rows=3`,
          { headers: { Authorization: "3b036afe-0110-4202-b9ed-99718476c2e0" } }
        )
        .then(response => {
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

    soaprequest(){
      const depcoord = this.infosdepart[0].geometry.coordinates
      const arrcoord = this.infosarrivee[0].geometry.coordinates
      this.loading = true
      let xmls=`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:exam="http://example/">\
                <soapenv:Header/>\
                <soapenv:Body>\
                    <exam:distance>\
                      <arg0>${arrcoord[0]}</arg0>\
                      <arg1>${arrcoord[1]}</arg1>\
                      <arg2>${depcoord[0]}</arg2>\
                      <arg3>${depcoord[1]}</arg3>\
                      <!--Optional:-->\
                      <arg4>K</arg4>\
                    </exam:distance>\
                </soapenv:Body>\
              </soapenv:Envelope>`;
      axios
        .post(`https://soap-felastronaut-trouvetontra.herokuapp.com/services/CalculDistance?wsdl`,xmls,{headers:{'Content-Type': 'text/xml'}})
        .then(response => {
            this.response = response.data
            var parser;
            parser = new DOMParser();
            var xmlDoc = parser.parseFromString(response.data,"text/xml");
            var xmlResponseString = xmlDoc.getElementsByTagName("return")[0].childNodes[0].nodeValue;
            var xmlResponseInt = parseFloat(xmlResponseString).toFixed(2);
            this.distanceClique = 1
            this.calculDistance = xmlResponseInt;
            this.calculVoyage()
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => this.loading = false);
    },

    calculVoyage(){
        this.loading = true;
      axios
        .get(
          `https://tranquil-beach-75690.herokuapp.com/devise/1`
        )
        .then(response => {
          
          this.response = response.data;
          
          if (this.selectedCurrency == "EUR") {
            this.factorCurrencies = response.data.EUR
          }
          else if(this.selectedCurrency == "CHF"){
            this.factorCurrencies = response.data.CHF
          } 
          else if(this.selectedCurrency == "USD"){
            this.factorCurrencies = response.data.USD
          }
          else if(this.selectedCurrency == "GBD"){
            this.factorCurrencies = response.data.GBD
          }
          else {
            this.factorCurrencies = response.data.EUR
          }
          this.factorCurrency = parseFloat(this.factorCurrencies).toFixed(2);
          
          this.calculPrix = parseFloat(this.calculDistance).toFixed(2) * this.factorCurrency
          this.calculPrix = parseFloat(this.calculPrix).toFixed(2)
          this.prixClique = 1
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

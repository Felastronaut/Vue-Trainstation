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
        <b-form-datepicker id="date" :min="minDate" v-model="date"/>
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
          <option v-for="info in infosdepart" :key="info.recordid">{{info.fields.gare_ut_libelle}} ({{info.fields.pltf_departement_numero}})</option>
        </datalist>
      </div>

      <div class="input_wrapper">
        <label for="arrivee">Arrivée</label>
        <b-form-input list="arrivee" v-model="arrivee" @input="searchGare('arr', arrivee)"/>
        <datalist id="arrivee">
          <option v-if="loading">Chargement...</option>
          <option v-for="info in infosarrivee" :key="info.recordid">{{info.fields.gare_ut_libelle}} ({{info.fields.pltf_departement_numero}})</option>
        </datalist>
      </div>
      
      <div class="input_wrapper">
        <b-button variant="primary" @click="rechercher(date, time)">Voyager</b-button>
        <span>{{voyage}}</span>
      </div>
    </div>

    <b-button @click="soaprequest()">
      Calcul Distance ( SOAP )
    </b-button><br><br>
    La distance à parcourir pour votre trajet est de :<strong> {{ calculDistance }} Km </strong>


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
        { text: 'USD', value: 'USD' },
        { text: 'GBD', value: 'GBD' }
      ],
      selectedCurrency: 'EUR',
      voyage: '',
      minDate: minDate,
      response: '',
      latarrivee: '',
      longarrivee: '',
      latdepart: '',
      longdepart: '',
      calculDistance: '',
    };
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
          `https://api.sncf.com/v1/coverage/sncf/journeys?from=${depcoord[0]};${depcoord[1]}&to=${arrcoord[0]};${arrcoord[1]}&datetime=${datetime}&max_nb_journeys=5`,
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
        .post(`http://soap-felastronaut-trouvetontra.herokuapp.com/services/CalculDistance?wsdl`,xmls,{headers:{'Content-Type': 'text/xml'}})
        .then(response => {
            this.response = response.data
            console.log(response.data);
            console.log("^^^^^^ RESPONSE ^^^^^^")

            var parser;
            parser = new DOMParser();
            var xmlDoc = parser.parseFromString(response.data,"text/xml");
            console.log(xmlDoc)
            var xmlResponseString = xmlDoc.getElementsByTagName("return")[0].childNodes[0].nodeValue;
            console.log(xmlResponseString)
            console.log("^^^^^^ TEST XML PARSE ^^^^^^")

            var xmlResponseInt = parseFloat(xmlResponseString).toFixed(2);
            console.log(xmlResponseInt)
            console.log("^^^^^^ TEST INT ^^^^^^")
            this.calculDistance = xmlResponseInt;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => this.loading = false);
    }
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

<template>
  <div>
    <br/>
    <div class="input_wrapper">
        <label for="arrivee">Lat Arrivée</label>
        <b-form-input list="arrivee" v-model="latarrivee"/>
    </div>
    <div class="input_wrapper">
        <label for="arrivee">Long Arrivée</label>
        <b-form-input list="arrivee" v-model="longarrivee"/>
    </div>
    <div class="input_wrapper">
        <label for="arrivee">Lat Départ</label>
        <b-form-input list="arrivee" v-model="latdepart"/>
    </div>
    <div class="input_wrapper">
        <label for="arrivee">Long Départ</label>
        <b-form-input list="arrivee" v-model="longdepart"/>
    </div>
    <b-button @click="soaprequest()">
      SOAP REQUEST
    </b-button>
    {{ response }}
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data () {
    return {
      response: [],
      loading: false,
      errored: false,
      authStr: '',
      depart: 'Annecy',
      etape: 0,
      gareselected: '',
      latarrivee: '53',
      longarrivee: '32',
      latdepart: '12',
      longdepart: '12',
    }
  },
  
methods:{
    soaprequest(){
      this.loading = true
      let xmls=`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:exam="http://example/">\
                <soapenv:Header/>\
                <soapenv:Body>\
                    <exam:distance>\
                      <arg0>${this.latarrivee}</arg0>\
                      <arg1>${this.longarrivee}</arg1>\
                      <arg2>${this.latdepart}</arg2>\
                      <arg3>${this.longdepart}</arg3>\
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
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => this.loading = false);
    }

  }
}
</script>
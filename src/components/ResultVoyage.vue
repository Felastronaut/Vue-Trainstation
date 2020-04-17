<template>
  <div/>
</template>


<script>
import axios from 'axios'

export default {
  data () {
    return {
      response: [],
      loading: false,
      errored: false,
      latarrivee: '53',
      longarrivee: '32',
      latdepart: '12',
      longdepart: '12'
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
            console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => this.loading = false);
    }

  }
}
</script>
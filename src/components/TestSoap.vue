<template>
  <div>
    <b-button @click="soaprequest()">
      SOAP REQUEST
    </b-button>
  </div>
</template>


<script>
import axios from 'axios'

export default {
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
  
method:{
    soaprequest(){
      this.loading = true
      let xmls='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
                                  xmlns:web="http://www.webserviceX.NET/">\
                <soapenv:Header/>\
                <soapenv:Body>\
                  <web:ConversionRate>\
                    <web:FromCurrency>INR</web:FromCurrency>\
                    <web:ToCurrency>USD</web:ToCurrency>\
                  </web:ConversionRate>\
                </soapenv:Body>\
              </soapenv:Envelope>';
      axios
      .post(`https://soap-api-train-app-constant.herokuapp.com/`,xmls,{headers:{'Content-Type': 'text/xml'}})
      .then(response => {
          this.response = response
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
<template>
    <b-form>
       <div class=form> 
        <label class="sr-only" for="date">Date of departure</label>
        <b-input 
            id="date"
            type=date
            v-model="date"/>

        <label class="sr-only" for="time">Time</label>
        <b-input 
            id="time"
            type=time
            v-model="time"/>

        <label class="sr-only" for="depart">Departure</label>
        <b-input
            id="depart"
            placeholder="Departure"
            v-model="depart"/>

        <label class="sr-only" for="arrivee">Arrival</label>
        <b-input 
            id="arrivee" 
            placeholder="Arrival"
            v-model="arrivee"/>
        
        <label class="sr-only" for="arrivee">Currency</label>
        <b-input 
            id="currency" 
            placeholder="Currency"
            v-model="currency"/>

        <b-button variant="primary" @click="rechercher">Rechercher</b-button>
        <p>{{voyage}}</p>
       </div>

       <div class="apiinfo">
           
            <p>{{ apiinfo }}</p>
            <span class="lighten">
            
            </span>
        </div>
    </b-form>
</template>




<script>

import axios from 'axios'

export default {
  name: 'Dev',
  data() {
    return{
        depart: '',
        arrivee: '',
        date: '',
        time: '',
        currency: '',
        apiinfo: ''
    }
  },
  methods: {
      rechercher(){
          console.log( 'Date : ' + this.date)
          console.log( 'Time : ' + this.time)
          console.log( 'Departure : ' + this.depart)
          console.log( 'Arrival : ' + this.arrivee)
          console.log( 'Arrival : ' + this.currency)
          console.log( 'Your trip is ' + this.voyage)
      }
  },
  computed: {
      voyage() {
          return this.depart + ' -> ' + this.arrivee + ' the ' + this.date + ' at ' + this.time
      }
  },

  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.apiinfo = response.data.bpi))
      .catch(error => console.log(error))
  },

  filters: {
       // Filter definitions
        currencydecimal (value) {
            return value.toFixed(2);
        }
    }

}
</script>






<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.b-form {
    background-color: red;
}
</style>

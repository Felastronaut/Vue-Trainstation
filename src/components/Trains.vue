<template>
    <b-form>
        <label class="sr-only" for="depart">Départ</label>
        <b-input
            id="depart"
            placeholder="Départ"
            v-model="depart"/>

        <label class="sr-only" for="arrivee">Arrivée</label>
        <b-input 
            id="arrivee" 
            placeholder="Arrivée"
            v-model="arrivee"/>

        <b-button variant="primary" @click="rechercher">Rechercher</b-button>
        <p>{{voyage}}</p>
    </b-form>
</template>

<script>
export default {
  name: 'Trains',
  data() {
    return{
        depart: '',
        arrivee: ''
    }
  },
  methods: {
      rechercher(){
          console.log( 'votre voyage est ' + this.voyage)
      }
  },
  computed: {
      voyage() {
          return this.depart + ' -> ' + this.arrivee
      }
  }
}
</script>

<style scoped>
</style>

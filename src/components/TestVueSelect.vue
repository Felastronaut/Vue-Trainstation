<template>
<div id="app">
  <h1>Vue Select</h1>
  <v-select :options="currencies" label="value" v-model="selected">
  <template #search="{attributes, events}">
    <input
      class="vs__search"
      :required="!selected"
      v-bind="attributes"
      v-on="events"
    />
  </template>
</v-select>

</div>
</template>

<script>
import Vue from 'vue';
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

export default {

    data() {
        return {
        selected: '',
        currencies: [
            { zone: 'Europe', value: 'EUR' },
            { zone: 'Swiss', value: 'CHF' },
            { zone: 'USA', value: 'USD' }
        ]
        }
    }
}


</script>

<style>
body {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
}

h1 {
  font-size: 26px;
  font-weight: 600;
  color: #2c3e5099;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
  -moz-text-size-adjust: none;
}

#app {
  max-width: 30em;
  margin: 1em auto;
}
</style>
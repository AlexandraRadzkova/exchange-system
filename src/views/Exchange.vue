<template>
  <div class="container">

    <div class="row">
      <div class="col-xl-1"></div>
      <div class="col-xl-6">

        <ExchangeForm :currencies="currencies" />

      </div>
      <div class="col-xl-4">

        <Sidebar :currencies="currencies" />

      </div>
    </div>

  </div>
</template>

<script>
  import { Sidebar } from '../components'
  import ExchangeForm from './components/Exchange/ExchangeForm'

  export default {
    name: 'Exchange',

    data () {
      return {
        currencies: [
          { value: 'byn', text: 'BYN' },
          { value: 'usd', text: 'USD' },
          { value: 'eur', text: 'EUR' },
          { value: 'btc', text: 'BTC' }
        ]
      }
    },

    components: {
      Sidebar,
      ExchangeForm
    }
  }
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-6">
        <ExchangeForm :currencies="currencies"/>
      </div>
      <div class="col-xl-5">
        <Sidebar :currencies="currencies"/>
      </div>
    </div>

    <AuthModal/>
  </div>
</template>

<script>
import { Sidebar } from '../components'

import ExchangeForm from './components/Exchange/ExchangeForm'
import AuthModal from './components/Exchange/AuthModal'

export default {
  name: 'Exchange',

  data() {
    return {
      currencies: null,
    }
  },

  mounted() {
    this.axios.get('/currencies').then((resp) => {
      this.currencies = resp.data
    })
  },

  components: {
    Sidebar,
    ExchangeForm,
    AuthModal,
  },
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <Spinner class="mt-5" v-show="!transactionDataLoaded"/>

        <div class="transaction-wrapper" v-if="transactionDataLoaded">
          <h2>Транзакция #{{ transactionData.id }}</h2>

          <b-card class="mb-4">
            <div class="row">
              <div class="col-md-5">
                <b-card class="text-center" style="font-size: 20px">
                  <b>{{ transactionData.amount }}</b>
                  {{ transactionData.currencyFrom.code }}
                </b-card>
              </div>
              <div class="col-md-2 text-center">
                <i
                  id="iconBetweenTransactionCurrencies"
                  class="fa fa-long-arrow-right"
                  aria-hidden="true"
                ></i>
              </div>
              <div class="col-md-5 mb-3">
                <b-card class="text-center" style="font-size: 20px">
                  <b>{{ transactionData.receivedAmount }}</b>
                  {{ transactionData.currencyTo.code }}
                </b-card>
              </div>
            </div>

            <ul class="transaction-summary-list">
              <li>
                <b>Дата:</b>
                {{ new Date(transactionData.timestamp).toLocaleString() }}
              </li>
              <li>
                <router-link :to="`/admin/users/${transactionData.userId}`">Пользователь</router-link>
              </li>
            </ul>
          </b-card>

          <b-button to="/admin/transactions" exact variant="outline-primary">
            <i class="fa fa-chevron-left"></i>&nbsp; Все транзакции
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from './components/Spinner'

export default {
  name: 'Transaction',

  data() {
    return {
      transactionDataLoaded: false,
      transactionData: null,
    }
  },

  mounted() {
    this.axios
      .get(`/exchanges/${this.$route.params.id}`, {
        headers: { authorization: sessionStorage.getItem('adminToken') },
      })
      .then((response) => {
        this.transactionData = response.data.data
        this.transactionDataLoaded = true
      })
  },

  components: {
    Spinner,
  },
}
</script>

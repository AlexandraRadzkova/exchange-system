<template>
  <div>
    <div class="row mb-3">
      <div class="col-sm-6">
        <h4 class="py-1">Курсы валют к</h4>
      </div>
      <div class="col-sm-3">
        <b-form-group>
          <b-form-input
            type="number"
            min="1"
            v-model.number="sumToExchange"
            @input="sumToExchangeInputHandler"
          />
        </b-form-group>
      </div>
      <div class="col-sm-3">
        <b-form-group>
          <b-form-select v-model="currRate">
            <option
              v-for="currency in currencies"
              :value="currency.currency.code"
            >{{currency.currency.code}}</option>
          </b-form-select>
        </b-form-group>
      </div>
    </div>

    <Spinner v-show="!currenciesLoaded"/>

    <b-table
      v-if="currenciesLoaded"
      striped
      hover
      stacked="md"
      :items="currenciesToRate"
      :fields="currenciesRatesTableFields"
    >
      <template
        slot="currency"
        slot-scope="currency"
      >{{ currency.item.currency.displayCount !== 1 ? currency.item.currency.displayCount : null }} {{ currency.item.currency.code }}</template>

      <template slot="purchase" slot-scope="currency">{{ currency.item.currency.buyValue }}</template>

      <template slot="sale" slot-scope="currency">{{ currency.item.currency.sellValue }}</template>

      <template slot="exchange" slot-scope="currency">{{ currency.item.amount }}</template>
    </b-table>
  </div>
</template>

<script>
import Spinner from '../Spinner'

export default {
  name: 'currencies-rates-table',

  props: ['currencies'],

  data() {
    return {
      currenciesLoaded: false,
      sumToExchange: 1,
      currencyRate: 'BYN',
      currenciesRatesTableFields: [
        { key: 'currency', label: 'Валюта' },
        { key: 'purchase', label: 'Покупка' },
        { key: 'sale', label: 'Продажа' },
        { key: 'exchange', label: 'Обмен' },
      ],
      currenciesToRate: null,
    }
  },

  computed: {
    currRate: {
      get() {
        return this.currencyRate
      },

      set(newValue) {
        this.currencyRate = newValue
        this.currencyRateChangeHandler()
      },
    },
  },

  methods: {
    getCurrenciesToRate() {
      let querystring =
        'code=' + this.currencyRate + '&amount=' + this.sumToExchange

      this.axios.get('/currencies?' + querystring).then((resp) => {
        this.currenciesToRate = resp.data
        this.currenciesLoaded = true
      })
    },

    sumToExchangeInputHandler() {
      this.getCurrenciesToRate()
    },

    currencyRateChangeHandler() {
      this.getCurrenciesToRate()
    },
  },

  mounted() {
    this.getCurrenciesToRate()
  },

  components: {
    Spinner,
  },
}
</script>

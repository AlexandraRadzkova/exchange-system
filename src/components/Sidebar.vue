<template>
  <div class="sidebar">

    <b-card class="mb-4">
      <div class="row mb-3">
        <div class="col-sm-8">

          <h4 class="py-1">Курсы валют к</h4>

        </div>
        <div class="col-sm-4">

          <b-form-group>
            <b-form-select v-model="currencyRate" :options="currencies" @change="currencyRateChangeHandler" />
          </b-form-group>

        </div>
      </div>

      <b-table striped hover :items="currencyRatesItems" :fields="currencyRatesFields"></b-table>

    </b-card>

    <b-card class="text-center mb-4">
      <h4>Инфо блок</h4>
      <p>Очень важная инормация об этом обменнике. Очень важная инормация об этом обменнике. Очень важная инормация об этом обменнике. Очень важная инормация об этом обменнике. Очень важная инормация об этом обменнике. Очень важная инормация об этом обменнике. </p>
    </b-card>

  </div>
</template>

<script>
  export default {
    name: 'Sidebar',

    props: ['currencies'],

    data () {
      return {
        currencyRate: 'byn',
        currencyRatesFields: [ 'Валюта', 'Покупка', 'Продажа' ],
        currencyRatesItems: [
          { Валюта: 'USD', Покупка: '1.95', Продажа: '2.05' },
          { Валюта: 'EUR', Покупка: '1.95', Продажа: '2.05' },
          { Валюта: 'RUB', Покупка: '1.95', Продажа: '2.05' },
          { Валюта: 'BTC', Покупка: '1.95', Продажа: '2.05' }
        ]
      }
    },

    methods: {
      currencyRateChangeHandler (value) {
        console.log(value)
      }
    }
  }
</script>

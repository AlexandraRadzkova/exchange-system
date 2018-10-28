<template>
  <div class="exchange-form mb-4">
    <b-card>

      <h2 class="text-center mb-4">Обмен</h2>

      <div class="row">
        <div class="col-md-5">

          <b-form-group>
            <b-form-select v-model="exchangeFormData.currencyFrom" :options="currencies" />
          </b-form-group>

        </div>
        <div class="col-md-2 text-center mb-3">
          <i class="fa fa-long-arrow-right align-middle" aria-hidden="true"></i>
        </div>
        <div class="col-md-5">

          <b-form-group>
            <b-form-select v-model="exchangeFormData.currencyTo" :options="currencies" />
          </b-form-group>

        </div>
      </div>

      <div class="row">
        <div class="col-md-6">

          <b-form-group label="Отдаете:">
            <b-form-input v-model="exchangeFormData.sumToExchange"
                          @input="exchangeSumInputHandler"
                          placeholder="Ваша сумма" />
          </b-form-group>

        </div>
        <div class="col-md-6">

          <b-form-group label="Получаете:">
            <b-form-input v-model="exchangeFormData.sumToReceive"
                          @input="receiveSumInputHandler"
                          placeholder="Сумма к получению" />
          </b-form-group>

        </div>
      </div>

      <div class="row">
        <div class="col-md-6">

          <b-form-group label="Имя:">
            <b-form-input v-model="exchangeFormData.name"
                          placeholder="Ваше имя" />
          </b-form-group>

        </div>
        <div class="col-md-6">

          <b-form-group label="Фамилия:">
            <b-form-input v-model="exchangeFormData.surname"
                          placeholder="Ваша фамилия" />
          </b-form-group>

        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-12">

          <b-form-group horizontal
                        :label-cols="5"
                        label="Номер паспорта:">
          <b-form-input v-model="exchangeFormData.passportNumber"
                        placeholder="Ваш номер паспорта" />
        </b-form-group>

        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-12 text-center">

          <b-button @click="submitExchangeForm" size="lg" variant="outline-primary">Обмен</b-button>

        </div>
      </div>

    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'exchange-form',

    props: ['currencies'],

    data () {
      return {
        exchangeFormData: {
          currencyFrom: 'byn',
          currencyTo: 'usd',
          sumToExchange: null,
          sumToReceive: null,
          name: null,
          surname: null,
          passportNumber: null
        }
      }
    },

    methods: {
      exchangeSumInputHandler (value) {
        console.log(value)
      },
      receiveSumInputHandler (value) {
        console.log(value)
      },
      submitExchangeForm () {
        console.log(this.exchangeFormData)
        alert('Спасибо за использование нашей системы обмена!')
        for (let formEl in this.exchangeFormData) {
          this.exchangeFormData[formEl] = null
        }
        this.exchangeFormData['currencyFrom'] = 'byn'
        this.exchangeFormData['currencyTo'] = 'usd'
      }
    }
  }
</script>

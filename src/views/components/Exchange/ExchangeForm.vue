<template>
  <div class="exchange-form mb-4">
    <b-card v-show="!exchangeCompleted">
      <h2 class="text-center mb-4">Обмен</h2>

      <form @submit.prevent="submitExchangeForm" data-vv-scope="exchange">
        <div class="row">
          <div class="col-md-5">
            <b-form-group>
              <b-form-select v-model="currFromCode">
                <option
                  v-for="currency in currencies"
                  :value="currency.currency.code"
                >{{currency.currency.code}}</option>
              </b-form-select>
            </b-form-group>
          </div>
          <div class="col-md-2 text-center mb-3">
            <i class="fa fa-long-arrow-right align-middle" aria-hidden="true"></i>
          </div>
          <div class="col-md-5">
            <b-form-group>
              <b-form-select v-model="currToCode">
                <option
                  v-for="currency in currencies"
                  :value="currency.currency.code"
                >{{currency.currency.code}}</option>
              </b-form-select>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <b-form-group
              label="Отдаете:"
              :state="errors.has('exchange.transactionExchangeSum') ? false : null"
            >
              <b-form-input
                v-model.number="exchangeFormData.transaction.amount"
                @keyup.native="exchangeSumInputHandler"
                data-vv-name="transactionExchangeSum"
                data-vv-as="'Сумма обмена'"
                v-validate="'required'"
                :state="errors.has('exchange.transactionExchangeSum') ? false : null"
                placeholder="Ваша сумма"
              />
              <span
                class="text-danger"
                v-show="errors.has('exchange.transactionExchangeSum')"
              >{{ errors.first('exchange.transactionExchangeSum') }}</span>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="Получаете:">
              <b-form-input
                v-model.number="sumToReceive"
                @keyup.native="receiveSumInputHandler"
                placeholder="Сумма к получению"
              />
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <b-form-group label="Имя:" :state="errors.has('exchange.firstname') ? false : null">
              <b-form-input
                v-model="exchangeFormData.user.firstname"
                data-vv-name="firstname"
                data-vv-as="'Имя'"
                v-validate="'required'"
                :state="errors.has('exchange.firstname') ? false : null"
                placeholder="Ваше имя"
              />
              <span
                class="text-danger"
                v-show="errors.has('exchange.firstname')"
              >{{ errors.first('exchange.firstname') }}</span>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="Фамилия:" :state="errors.has('exchange.lastname') ? false : null">
              <b-form-input
                v-model="exchangeFormData.user.lastname"
                data-vv-name="lastname"
                data-vv-as="'Фамилия'"
                v-validate="'required'"
                :state="errors.has('exchange.lastname') ? false : null"
                placeholder="Ваша фамилия"
              />
              <span
                class="text-danger"
                v-show="errors.has('exchange.lastname')"
              >{{ errors.first('exchange.lastname') }}</span>
            </b-form-group>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-md-12">
            <b-form-group
              horizontal
              :label-cols="5"
              label="Номер паспорта:"
              :state="errors.has('exchange.passport') ? false : null"
            >
              <b-form-input
                v-model="exchangeFormData.user.passport"
                data-vv-name="passport"
                data-vv-as="'Номер паспорта'"
                v-validate="'required'"
                :state="errors.has('exchange.passport') ? false : null"
                placeholder="Ваш номер паспорта"
              />
              <span
                class="text-danger"
                v-show="errors.has('exchange.passport')"
              >{{ errors.first('exchange.passport') }}</span>
            </b-form-group>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-md-12 text-center">
            <b-button
              type="submit"
              ref="submitExchangeBtn"
              class="ladda-button"
              size="lg"
              variant="outline-primary"
              data-style="expand-right"
              data-spinner-size="30"
              data-spinner-color="#007BFF"
            >
              <span class="ladda-label">Обмен</span>
            </b-button>
          </div>
        </div>
      </form>
    </b-card>

    <b-card v-if="exchangeCompleted" class="exchange-cheque">
      <span class="cheque-close" @click="closeCheque">
        <i class="fa fa-times"></i>
      </span>

      <h3 class="text-center">Чек</h3>

      <div class="row">
        <div class="col-md-5">
          <b-card class="cheque-exchange-currency">
            <span class="exch-sum"></span>
            {{ this.exchangeCheque.transaction.currencyFromCode }}
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
          <b-card class="cheque-exchange-currency">
            <span class="exch-sum"></span>
            {{ this.exchangeCheque.transaction.currencyToCode }}
          </b-card>
        </div>
      </div>

      <ul class="transaction-summary-list">
        <li>
          <b>Ваш ID:</b>
          {{ this.exchangeCheque.user.id }}
        </li>
        <li>
          <b>Имя:</b>
          {{ this.exchangeCheque.user.firstname }}
        </li>
        <li>
          <b>Фамилия:</b>
          {{ this.exchangeCheque.user.lastname }}
        </li>
      </ul>
    </b-card>
  </div>
</template>

<script>
import Ladda from 'ladda'

export default {
  name: 'exchange-form',

  inject: ['$validator'],

  props: ['currencies'],

  data() {
    return {
      exchangeFormData: {
        user: {
          passport: null,
          firstname: null,
          lastname: null,
        },
        transaction: {
          currencyFromCode: 'USD',
          currencyToCode: 'BYN',
          amount: null,
        },
      },
      sumToReceive: null,
      lastActiveSumInput: null,
      exchangeCheque: null,
      exchangeCompleted: false,
    }
  },

  computed: {
    currFromCode: {
      get() {
        return this.exchangeFormData.transaction.currencyFromCode
      },
      set(newValue) {
        this.exchangeFormData.transaction.currencyFromCode = newValue
        this.conversionCurrencyChangeHandler()
      },
    },

    currToCode: {
      get() {
        return this.exchangeFormData.transaction.currencyToCode
      },
      set(newValue) {
        this.exchangeFormData.transaction.currencyToCode = newValue
        this.conversionCurrencyChangeHandler()
      },
    },
  },

  methods: {
    conversionCurrencyChangeHandler() {
      if (this.lastActiveSumInput) {
        if (this.lastActiveSumInput === 'exchange') {
          this.exchangeSumInputHandler()
        } else if (this.lastActiveSumInput === 'receive') {
          this.receiveSumInputHandler()
        }
      }
    },

    exchangeSumInputHandler() {
      if (
        this.exchangeFormData.transaction.currencyFromCode ===
        this.exchangeFormData.transaction.currencyToCode
      ) {
        this.sumToReceive = this.exchangeFormData.transaction.amount
        return
      }

      setTimeout(() => {
        let querystring =
          'code=' +
          this.exchangeFormData.transaction.currencyFromCode +
          '&amount=' +
          this.exchangeFormData.transaction.amount

        this.axios.get('/currencies?' + querystring).then((response) => {
          let receiveCurr = response.data.filter(function(currencyItem) {
            return (
              currencyItem.currency.code ===
              this.exchangeFormData.transaction.currencyToCode
            )
          }, this)[0]

          this.sumToReceive = receiveCurr.amount
        })

        this.lastActiveSumInput = 'exchange'
      }, 300)
    },

    receiveSumInputHandler() {
      if (
        this.exchangeFormData.transaction.currencyFromCode ===
        this.exchangeFormData.transaction.currencyToCode
      ) {
        this.exchangeFormData.transaction.amount = this.sumToReceive
        return
      }

      setTimeout(() => {
        let querystring =
          'code=' +
          this.exchangeFormData.transaction.currencyToCode +
          '&amount=' +
          this.sumToReceive +
          '&reversed=true'

        this.axios.get('/currencies?' + querystring).then((response) => {
          let exchangeCurr = response.data.filter(function(currencyItem) {
            return (
              currencyItem.currency.code ===
              this.exchangeFormData.transaction.currencyFromCode
            )
          }, this)[0]

          this.exchangeFormData.transaction.amount = exchangeCurr.amount
        })

        this.lastActiveSumInput = 'receive'
      }, 300)
    },

    closeCheque() {
      this.exchangeCompleted = false
      this.exchangeCheque = {}
    },

    submitExchangeForm() {
      this.$validator.validateAll('exchange').then((result) => {
        if (result) {
          let submitBtn = Ladda.create(this.$refs.submitExchangeBtn)
          submitBtn.start()

          this.axios
            .post('/exchanges', this.exchangeFormData)
            .then((response) => {
              submitBtn.stop()

              if (response.data.success) {
                localStorage.setItem('userToken', response.data.data.user.token)

                this.$toastr.success(
                  'Обмен успешно совершен!',
                  'Сумма обмена: ' +
                    this.exchangeFormData.transaction.amount +
                    ' ' +
                    this.exchangeFormData.transaction.currencyFromCode +
                    '<br>' +
                    'Получено: ' +
                    this.sumToReceive +
                    ' ' +
                    this.exchangeFormData.transaction.currencyToCode,
                )

                this.exchangeCompleted = true

                this.exchangeCheque = {
                  user: {
                    ...response.data.data.user,
                  },
                  transaction: {
                    ...response.data.data.transaction,
                  },
                }
              } else {
                if (response.data.errors.user) {
                  this.$toastr.error(
                    'Ошибка при обмене!',
                    response.data.message,
                  )
                } else if (response.data.errors.amount) {
                  this.$toastr.error(
                    'Ошибка при обмене!',
                    response.data.errors.amount.message,
                  )
                }
              }

              for (let formElGroup in this.exchangeFormData) {
                for (let formEl in this.exchangeFormData[formElGroup]) {
                  this.exchangeFormData[formElGroup][formEl] = null
                }
              }

              this.exchangeFormData.transaction.currencyFromCode = 'USD'
              this.exchangeFormData.transaction.currencyToCode = 'BYN'
              this.sumToReceive = null
            })
            .then(() => {
              this.$nextTick(() => {
                this.errors.clear('exchange')
              })
            })
        }
      })
    },
  },
}
</script>

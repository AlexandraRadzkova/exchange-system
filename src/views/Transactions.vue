<template>
  <div class="container">
    <Spinner v-show="!isAuthorized" class="mt-5"/>

    <div v-if="isAuthorized" class="row">
      <div class="col-lg-8">
        <div class="row mb-4">
          <div class="col-md-6">
            <b-form-group label="Показывать на странице">
              <b-form-select
                :options="transactionsTable.pageOptions"
                v-model="transactionsTable.perPage"
              />
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="Поиск">
              <b-input-group>
                <b-form-input v-model="transactionsTable.filter" placeholder="Найти"/>
                <b-input-group-button>
                  <b-btn
                    :disabled="!transactionsTable.filter"
                    @click="transactionsTable.filter = ''"
                  >Clear</b-btn>
                </b-input-group-button>
              </b-input-group>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <b-form-group label="Транзакции с">
              <calendar
                :value="transactionsTable.filterFromDate"
                :on-day-click="onDayClick1"
                format="MM-dd-yyyy"
                :clear-button="true"
                width="100%"
                placeholder="Введите дату"
              ></calendar>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="Транзакции по">
              <calendar
                :value="transactionsTable.filterToDate"
                :on-day-click="onDayClick2"
                format="MM-dd-yyyy"
                :clear-button="true"
                width="100%"
                placeholder="Введите дату"
              ></calendar>
            </b-form-group>
          </div>
        </div>

        <Spinner v-show="!transactionsLoaded && !transactionsLoadingFailed" class="mt-4"/>

        <b-table
          v-show="transactionsLoaded || transactionsLoadingFailed"
          striped
          hover
          show-empty
          stacked="md"
          :items="transactionsTable.transactions"
          :fields="transactionsTable.fields"
          :current-page="transactionsTable.currentPage"
          :per-page="transactionsTable.perPage"
          :filter="transactionsTable.filter"
          class="transactions-table"
          @filtered="onFiltered"
          @row-clicked="transactionRowClickedHandler"
        >
          <template slot="id" slot-scope="transaction">{{ transaction.item.id }}</template>

          <template slot="userId" slot-scope="transaction">{{ transaction.item.userId }}</template>

          <template
            slot="date"
            slot-scope="transaction"
          >{{ new Date(transaction.item.timestamp).toLocaleString() }}</template>

          <template slot="sum" slot-scope="transaction">{{ transaction.item.amount }}</template>

          <template
            slot="currency"
            slot-scope="transaction"
          >{{ transaction.item.currencyFrom && transaction.item.currencyFrom.code }}</template>

          <template slot="empty">
            <p class="text-center my-2">Не найдено</p>
          </template>

          <template slot="emptyfiltered">
            <p class="text-center my-2">Не найдено</p>
          </template>
        </b-table>

        <b-pagination
          :total-rows="transactionsTable.totalRows"
          :per-page="transactionsTable.perPage"
          v-model="transactionsTable.currentPage"
          class="my-0"
        />
      </div>
      <div class="col-lg-4">
        <Spinner v-show="!transactionsLoaded && !transactionsLoadingFailed" class="mt-5"/>

        <div v-if="transactionsLoaded" class="common-info-wrapper">
          <b-card class="text-center mb-4">
            <ul>
              <li>
                <b>Количество всех транзакций:</b>
                {{ commonTransactionsData.count }}
              </li>
              <li>
                <b>Сумма всех транзакций:</b>
                {{ commonTransactionsData.amount }}
              </li>
              <li>
                <b>Дневная сумма транзакций:</b>
                {{ commonTransactionsData.dailyAmount }}
              </li>
            </ul>
          </b-card>

          <b-card class="text-center">
            <ul>
              <li>
                <b>Набиолее популярные валюта:</b>
                <ul>
                  <li>
                    <b>Из:</b>
                    {{ commonTransactionsData.mostPopular.currencyFrom && commonTransactionsData.mostPopular.currencyFrom.code }}
                  </li>
                  <li>
                    <b>В:</b>
                    {{ commonTransactionsData.mostPopular.currencyTo && commonTransactionsData.mostPopular.currencyTo.code }}
                  </li>
                </ul>
              </li>
            </ul>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main'

import Calendar from './components/Calendar'
import Spinner from './components/Spinner'

export default {
  name: 'Transactions',

  data() {
    return {
      isAuthorized: false,
      transactionsLoaded: false,
      transactionsLoadingFailed: false,
      commonTransactionsDataLoaded: false,
      commonTransactionsData: null,
      transactionsTable: {
        filterFromDate: null,
        filterToDate: null,
        fields: [
          { key: 'id', label: 'ID' },
          { key: 'userId', label: 'ID пользователя' },
          { key: 'date', label: 'Дата/время' },
          { key: 'sum', label: 'Сумма' },
          { key: 'currency', label: 'Валюта' },
        ],
        transactions: [],
        currentPage: 1,
        perPage: 5,
        totalRows: null,
        pageOptions: [5, 10, 15],
        filter: null,
      },
    }
  },

  methods: {
    rangeBus() {
      return eventBus
    },

    onFiltered(filteredItems) {
      this.transactionsTable.totalRows = filteredItems.length
      this.transactionsTable.currentPage = 1
    },

    onDayClick1(dateObject, formatDate) {
      this.transactionsTable.filterFromDate = formatDate

      let queryParams = []

      if (this.transactionsTable.filterFromDate !== '') {
        queryParams.push('timeFrom=' + this.transactionsTable.filterFromDate)
      }

      if (this.transactionsTable.filterToDate !== '') {
        queryParams.push('timeTo=' + this.transactionsTable.filterToDate)
      }

      if (this.$route.query.userId) {
        queryParams.push('userId=' + this.$route.query.userId)
      }

      let queryString = queryParams.join('&')

      this.transactionsLoaded = false

      this.axios
        .get('/exchanges?' + queryString, {
          headers: { authorization: sessionStorage.getItem('adminToken') },
        })
        .then((response) => {
          if (response.data.success) {
            const { transactions, info } = response.data.data

            this.transactionsTable.transactions = transactions
            this.transactionsTable.totalRows = this.transactionsTable.transactions.length

            this.commonTransactionsData = info
            this.commonTransactionsDataLoaded = true

            this.transactionsLoaded = true
          } else {
            this.transactionsLoaded = false
            this.transactionsLoadingFailed = true
            this.transactionsTable.transactions = []
          }
        })
    },

    onDayClick2(dateObject, formatDate) {
      this.transactionsTable.filterToDate = formatDate

      let queryParams = []

      if (this.transactionsTable.filterFromDate !== '') {
        queryParams.push('timeFrom=' + this.transactionsTable.filterFromDate)
      }

      if (this.transactionsTable.filterToDate !== '') {
        queryParams.push('timeTo=' + this.transactionsTable.filterToDate)
      }

      if (this.$route.query.userId) {
        queryParams.push('userId=' + this.$route.query.userId)
      }

      let queryString = queryParams.join('&')

      this.transactionsLoaded = false

      this.axios
        .get('/exchanges?' + queryString, {
          headers: { authorization: sessionStorage.getItem('adminToken') },
        })
        .then((response) => {
          if (response.data.success) {
            const { transactions, info } = response.data.data

            this.transactionsTable.transactions = transactions
            this.transactionsTable.totalRows = this.transactionsTable.transactions.length

            this.commonTransactionsData = info
            this.commonTransactionsDataLoaded = true

            this.transactionsLoaded = true
          } else {
            this.transactionsLoaded = false
            this.transactionsLoadingFailed = true
            this.transactionsTable.transactions = []
          }
        })
    },

    transactionRowClickedHandler(item) {
      this.$router.push(`/admin/transactions/${item.id}`)
    },
  },

  mounted() {
    this.transactionsTable.filterFromDate = ''
    this.transactionsTable.filterToDate = ''

    let queryParams = []

    if (this.transactionsTable.filterFromDate !== '') {
      queryParams.push('timeFrom=' + this.transactionsTable.filterFromDate)
    }

    if (this.transactionsTable.filterToDate !== '') {
      queryParams.push('timeTo=' + this.transactionsTable.filterToDate)
    }

    if (this.$route.query.userId) {
      queryParams.push('userId=' + this.$route.query.userId)
    }

    let queryString = queryParams.join('&')

    this.axios
      .get('/exchanges?' + queryString, {
        headers: { authorization: sessionStorage.getItem('adminToken') },
      })
      .then((response) => {
        const { transactions, info } = response.data.data

        this.transactionsTable.transactions = transactions
        this.transactionsTable.totalRows = this.transactionsTable.transactions.length

        this.commonTransactionsData = info
        this.commonTransactionsDataLoaded = true

        this.transactionsLoaded = true
      })
  },

  created() {
    let adminToken = sessionStorage.getItem('adminToken')

    if (!adminToken) {
      this.isAuthorized = false
      this.$router.push('/')
    } else {
      this.axios
        .get('/users/me', {
          headers: { authorization: adminToken },
        })
        .then((resp) => {
          if (resp.data.isAdmin) {
            this.isAuthorized = true
          } else {
            this.isAuthorized = false
            this.$router.push('/')
          }
        })
    }
  },

  components: {
    Calendar,
    Spinner,
  },
}
</script>

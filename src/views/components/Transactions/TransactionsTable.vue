<template>
  <div>

    <div class="row">
      <div class="col-md-6">

        <b-form-group label="Показывать на странице">
          <b-form-select :options="transactionsTable.pageOptions" v-model="transactionsTable.perPage" />
        </b-form-group>

      </div>
      <div class="col-md-6">

        <b-form-group label="Поиск">
          <b-input-group>
            <b-form-input v-model="transactionsTable.filter" placeholder="Найти" />
            <b-input-group-button>
              <b-btn :disabled="!transactionsTable.filter" @click="transactionsTable.filter = ''">Clear</b-btn>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>

      </div>
    </div>

    <div class="row">
      <div class="col-md-6">

        <b-form-group label="Транзакции с">
          <calendar :value="todayDate"
                    :on-day-click="onDayClick1"
                    format="dd-MM-yyyy"
                    :clear-button="true"
                    :range-bus="rangeBus"
                    :range-status="1"
                    width="100%"
                    placeholder="Введите дату">
          </calendar>
        </b-form-group>

      </div>
      <div class="col-md-6">

        <b-form-group label="Транзакции по">
          <calendar :value="todayDate"
                    :on-day-click="onDayClick2"
                    format="dd-MM-yyyy"
                    :clear-button="true"
                    :range-bus="rangeBus"
                    :range-status="2"
                    width="100%"
                    placeholder="Введите дату">
          </calendar>
        </b-form-group>

      </div>
    </div>

    <b-table striped
             hover
             show-empty
             stacked="md"
             :items="transactionsTable.items"
             :fields="transactionsTable.fields"
             :current-page="transactionsTable.currentPage"
             :per-page="transactionsTable.perPage"
             :filter="transactionsTable.filter"
             class="transactions-table"
             @filtered="onFiltered"
             @row-clicked="transactionRowClickedHandler">
    </b-table>

    <b-pagination :total-rows="transactionsTable.totalRows" :per-page="transactionsTable.perPage" v-model="transactionsTable.currentPage" class="my-0" />

  </div>
</template>

<script>
  import { eventBus } from '../../../main'
  import Calendar from '../Calendar'

  const transactions = [
    { id: 'id5678', userId: 'id5678', date: '06.12.2018 15:03', sum: 1253, currency: 'BYN' },
    { id: 'id5678', userId: 'id5678', date: '19.06.2018 15:03', sum: 13, currency: 'BTC' },
    { id: 'id5678', userId: 'id5678', date: '29.04.2018 15:03', sum: 1853, currency: 'USD' },
    { id: 'id5678', userId: 'id5678', date: '05.11.2017 15:03', sum: 1253, currency: 'BYN' },
    { id: 'id5678', userId: 'id5678', date: '06.12.2018 15:03', sum: 953, currency: 'BYN' },
    { id: 'id5678', userId: 'id5678', date: '19.08.2012 15:03', sum: 453, currency: 'EUR' },
    { id: 'id5678', userId: 'id5678', date: '07.11.2010 15:03', sum: 553, currency: 'BYN' },
    { id: 'id5678', userId: 'id5678', date: '06.12.2018 15:03', sum: 1253, currency: 'BYN' },
    { id: 'id5678', userId: 'id5678', date: '19.06.2018 15:03', sum: 13, currency: 'BTC' },
    { id: 'id5678', userId: 'id5678', date: '29.04.2018 15:03', sum: 1853, currency: 'USD' },
    { id: 'id5678', userId: 'id5678', date: '05.11.2017 15:03', sum: 1253, currency: 'BYN' },
    { id: 'id5678', userId: 'id5678', date: '06.12.2018 15:03', sum: 953, currency: 'BYN' },
    { id: 'id5678', userId: 'id5678', date: '19.08.2012 15:03', sum: 453, currency: 'EUR' },
    { id: 'id5678', userId: 'id5678', date: '07.11.2010 15:03', sum: 553, currency: 'BYN' },
    { id: 'id5678', userId: 'id5678', date: '06.12.2018 15:03', sum: 1253, currency: 'BYN' },
    { id: 'id5678', userId: 'id5678', date: '19.06.2018 15:03', sum: 13, currency: 'BTC' },
    { id: 'id5678', userId: 'id5678', date: '29.04.2018 15:03', sum: 1853, currency: 'USD' },
    { id: 'id5678', userId: 'id5678', date: '05.11.2017 15:03', sum: 1253, currency: 'BYN' },
    { id: 'id5678', userId: 'id5678', date: '06.12.2018 15:03', sum: 953, currency: 'BYN' },
    { id: 'id5678', userId: 'id5678', date: '19.08.2012 15:03', sum: 453, currency: 'EUR' }
  ]

  export default {
    name: 'TransactionsTable',

    data () {
      return {
        todayDate: '',
        transactionsTable: {
          filterFromDate: null,
          filterToDate: null,
          items: transactions,
          fields: [
            { key: 'id', label: 'ID' },
            { key: 'date', label: 'Дата/время', sortable: true },
            { key: 'sum', label: 'Сумма перевода', sortable: true },
            { key: 'currency', label: 'Валюта перевода' }
          ],
          currentPage: 1,
          perPage: 10,
          totalRows: transactions.length,
          pageOptions: [ 10, 15, 20 ],
          filter: null
        }
      }
    },

    methods: {
      rangeBus () {
        return eventBus
      },
      onFiltered (filteredItems) {
        this.transactionsTable.totalRows = filteredItems.length
        this.transactionsTable.currentPage = 1
      },
      onDayClick1 (dateObject, formatDate) {
        this.transactionsTable.filterFromDate = formatDate
      },
      onDayClick2 (dateObject, formatDate) {
        this.transactionsTable.filterToDate = formatDate
      },
      transactionRowClickedHandler (item) {
        this.$router.push('/admin/transactions/' + item.id)
      }
    },

    mounted () {
      var date = new Date()
      this.transactionsTable.filterFromDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
      this.transactionsTable.filterToDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
      this.todayDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    },

    components: {
      Calendar
    }
  }
</script>

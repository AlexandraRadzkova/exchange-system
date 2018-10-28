<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">

        <TransactionsTable class="mb-4" />

      </div>
      <div class="col-lg-4">

        <b-card class="text-center mb-4">
          <ul>
            <li><b>Сумма всех транзакций:</b> 135</li>
            <li><b>Сумма всех транзакций:</b> 135</li>
            <li><b>Сумма всех транзакций:</b> 135</li>
            <li><b>Сумма всех транзакций:</b> 135</li>
          </ul>
        </b-card>

        <b-card class="text-center">
          <ul>
            <li><b>Сумма всех транзакций:</b> 135</li>
            <li><b>Сумма всех транзакций:</b> 135</li>
            <li><b>Сумма всех транзакций:</b> 135</li>
            <li><b>Сумма всех транзакций:</b> 135</li>
          </ul>
        </b-card>
        
      </div>
    </div>
  </div>
</template>

<script>
  import TransactionsTable from './components/Transactions/TransactionsTable'

  export default {
    name: 'Transactions',

    components: {
      TransactionsTable
    }
  }
</script>

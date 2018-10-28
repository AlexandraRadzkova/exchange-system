<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">

        <h2>Транзакция #{{ $route.params.id }}</h2>

        <b-card class="mb-4">
          <div class="row">
            <div class="col-md-5">

              <b-card class="text-center" style="font-size: 20px"><b>100</b> BYN</b-card>

            </div>
            <div class="col-md-2 text-center">

              <i id="iconBetweenTransactionCurrencies" class="fa fa-long-arrow-right" aria-hidden="true"></i>
              
            </div>
            <div class="col-md-5 mb-3">

              <b-card class="text-center" style="font-size: 20px"><b>50</b> USD</b-card>

            </div>
          </div>

          <ul class="transaction-summary-list">
            <li><b>Дата: </b>06.12.2018 15:03</li>
            <li><b>Пользователь: </b><router-link to="/admin/users/id567">Вася</router-link></li>
          </ul>
        </b-card>

        <b-button to="/admin/transactions" exact variant="outline-primary"><i class="fa fa-chevron-left"></i>&nbsp; Все транзакции</b-button>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Transaction'
  }
</script>

<template>
  <div class="sidebar">

    <b-card class="mb-4">
      <CurrenciesRatesTable :currencies="currencies" />
    </b-card>

    <b-card class="text-center mb-4">
      <h4>Добро пожаловать в систему обмена валют!</h4>
      <p>
        Получить дополнительную информацию можно по телефону справочной службы: <br>
        <i class="fa fa-phone" style="font-size: 35px;"></i> &nbsp; <b style="font-size: 35px;">157</b>
      </p>
    </b-card>

  </div>
</template>

<script>
  import CurrenciesRatesTable from '../views/components/Exchange/CurrenciesRatesTable'

  export default {
    name: 'Sidebar',

    props: ['currencies'],

    components: {
      CurrenciesRatesTable
    }
  }
</script>

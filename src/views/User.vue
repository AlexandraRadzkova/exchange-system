<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">

        <h2>Пользователь #{{ $route.params.id }}</h2>

        <b-card class="mb-4">
          <ul class="user-summary-list">
            <li><b>Имя: </b>John</li>
            <li><b>Фамилия: </b>Doe</li>
            <li><b>За день: </b>877$</li>
            <li><b>За все время: </b>27589$</li>
            <li><b>До превышения лимита: </b>123$</li>
            <li><b>Количество транзакций: </b>128</li>
            <li><router-link to="/admin/transactions">Транзакции пользователя</router-link></li>
          </ul>
        </b-card>

        <b-button to="/admin/users" exact variant="outline-primary"><i class="fa fa-chevron-left"></i>&nbsp; Все пользователи</b-button>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'User'
  }
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <Spinner class="mt-5" v-show="!userDataLoaded"/>

        <div class="user-wrapper" v-if="userDataLoaded">
          <h2>Пользователь #{{ userData.id }}</h2>

          <b-card class="mb-4">
            <ul class="user-summary-list">
              <li>
                <b>Имя:</b>
                {{ userData.firstname }}
              </li>
              <li>
                <b>Фамилия:</b>
                {{ userData.lastname }}
              </li>
              <li>
                <b>За день:</b>
                ${{ userData.transactions.dailyAmount }}
              </li>
              <li>
                <b>За все время:</b>
                ${{ userData.transactions.allTimeAmount }}
              </li>
              <li>
                <b>До превышения лимита:</b>
                ${{ userData.transactions.beforeLimit }}
              </li>
              <li>
                <b>Количество транзакций:</b>
                {{ userData.transactions.allTimeCount }}
              </li>
              <li>
                <router-link
                  :to="`/admin/transactions?userId=${userData.id}`"
                >Транзакции пользователя</router-link>
              </li>
            </ul>
          </b-card>

          <b-button to="/admin/users" exact variant="outline-primary">
            <i class="fa fa-chevron-left"></i>&nbsp; Все пользователи
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from './components/Spinner'

export default {
  name: 'User',

  data() {
    return {
      userDataLoaded: false,
      userData: null,
    }
  },

  mounted() {
    this.axios
      .get(`/users/${this.$route.params.id}`, {
        headers: { authorization: sessionStorage.getItem('adminToken') },
      })
      .then((response) => {
        this.userData = response.data
        this.userDataLoaded = true
      })
  },

  components: {
    Spinner,
  },
}
</script>

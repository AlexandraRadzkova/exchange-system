<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-md-6">
            <b-form-group label="Показывать на странице">
              <b-form-select :options="usersTable.pageOptions" v-model="usersTable.perPage"/>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="Поиск">
              <b-input-group>
                <b-form-input v-model="usersTable.filter" placeholder="Найти"/>
                <b-input-group-button>
                  <b-btn :disabled="!usersTable.filter" @click="usersTable.filter = ''">Clear</b-btn>
                </b-input-group-button>
              </b-input-group>
            </b-form-group>
          </div>
        </div>

        <b-table
          striped
          hover
          show-empty
          stacked="md"
          :items="usersTable.users"
          :fields="usersTable.fields"
          :current-page="usersTable.currentPage"
          :per-page="usersTable.perPage"
          :filter="usersTable.filter"
          class="users-table"
          @filtered="onFiltered"
          @row-clicked="userRowClickedHandler"
        >
          <template slot="id" slot-scope="user">{{ user.item.id }}</template>

          <template slot="name" slot-scope="user">{{ user.item.firstname }} {{ user.item.lastname }}</template>

          <template
            slot="exchangesQuant"
            slot-scope="user"
          >{{ user.item.transactions.allTimeCount }}</template>

          <template slot="exchangesSum" slot-scope="user">{{ user.item.transactions.allTimeAmount }}</template>

          <template slot="empty">
            <p class="text-center my-2">
              <Spinner/>
            </p>
          </template>

          <template slot="emptyfiltered">
            <p class="text-center my-2">Не найдено</p>
          </template>
        </b-table>

        <b-pagination
          :total-rows="usersTable.totalRows"
          :per-page="usersTable.perPage"
          v-model="usersTable.currentPage"
          class="my-0"
        />
      </div>
      <div class="col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import Spinner from './components/Spinner'

export default {
  name: 'Users',

  data() {
    return {
      usersTable: {
        fields: [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Имя Фамилия' },
          { key: 'exchangesQuant', label: 'Количество транзакций' },
          { key: 'exchangesSum', label: 'Общая сумма переводов' },
        ],
        users: [],
        currentPage: 1,
        perPage: 10,
        totalRows: null,
        pageOptions: [10, 15, 20],
        filter: null,
      },
    }
  },

  methods: {
    onFiltered(filteredItems) {
      this.usersTable.totalRows = filteredItems.length
      this.usersTable.currentPage = 1
    },

    userRowClickedHandler(item) {
      this.$router.push(`/admin/users/${item.id}`)
    },
  },

  mounted() {
    this.axios
      .get('/users', {
        headers: { authorization: sessionStorage.getItem('adminToken') },
      })
      .then((response) => {
        this.usersTable.users = response.data
        this.usersTable.totalRows = this.usersTable.users.length
      })
  },

  components: {
    Spinner,
  },
}
</script>

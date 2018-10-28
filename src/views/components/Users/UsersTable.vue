<template>
  <div>

    <div class="row">
      <div class="col-md-6">

        <b-form-group label="Показывать на странице">
          <b-form-select :options="usersTable.pageOptions" v-model="usersTable.perPage" />
        </b-form-group>

      </div>
      <div class="col-md-6">

        <b-form-group label="Поиск">
          <b-input-group>
            <b-form-input v-model="usersTable.filter" placeholder="Найти" />
            <b-input-group-button>
              <b-btn :disabled="!usersTable.filter" @click="usersTable.filter = ''">Clear</b-btn>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>

      </div>
    </div>

    <b-table striped
             hover
             show-empty
             stacked="md"
             :items="usersTable.items"
             :fields="usersTable.fields"
             :current-page="usersTable.currentPage"
             :per-page="usersTable.perPage"
             :filter="usersTable.filter"
             class="users-table"
             @filtered="onFiltered"
             @row-clicked="userRowClickedHandler">
      <template slot="name" slot-scope="data">
        {{data.value.first}} {{data.value.last}}
      </template>
    </b-table>

    <b-pagination :total-rows="usersTable.totalRows" :per-page="usersTable.perPage" v-model="usersTable.currentPage" class="my-0" />

  </div>
</template>

<script>
  const users = [
    { id: 'id5678', name: { first: 'Shirley', last: 'Partridge' }, exchangesQuant: 63, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Rubin', last: 'Kincade' }, exchangesQuant: 123, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jane', last: 'Doe' }, exchangesQuant: 17, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Rubin', last: 'Kincade' }, exchangesQuant: 123, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 123 },
    { id: 'id5678', name: { first: 'Rubin', last: 'Kincade' }, exchangesQuant: 16, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 63, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jane', last: 'Doe' }, exchangesQuant: 123 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 453, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 13 },
    { id: 'id5678', name: { first: 'Shirley', last: 'Partridge' }, exchangesQuant: 123, exchangesSum: 5298 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 123, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Shirley', last: 'Partridge' }, exchangesQuant: 13, exchangesSum: 9698 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 4, exchangesSum: 1198 },
    { id: 'id5678', name: { first: 'Shirley', last: 'Partridge' }, exchangesQuant: 123, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 9, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 123 },
    { id: 'id5678', name: { first: 'Shirley', last: 'Partridge' }, exchangesQuant: 123, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 16, exchangesSum: 15898 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 3, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Rubin', last: 'Kincade' }, exchangesQuant: 123, exchangesSum: 1598 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 563, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Shirley', last: 'Partridge' }, exchangesQuant: 123, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 10, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 123, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jane', last: 'Doe' }, exchangesQuant: 18, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 123, exchangesSum: 63698 },
    { id: 'id5678', name: { first: 'Jane', last: 'Doe' }, exchangesQuant: 1, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Rubin', last: 'Kincade' }, exchangesQuant: 96, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 123, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Shirley', last: 'Partridge' }, exchangesQuant: 63, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Jack', last: 'Larsen' }, exchangesQuant: 423, exchangesSum: 15698 },
    { id: 'id5678', name: { first: 'Rubin', last: 'Kincade' }, exchangesQuant: 23, exchangesSum: 15698 }
  ]

  export default {
    name: 'UsersTable',

    data () {
      return {
        usersTable: {
          items: users,
          fields: [
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Имя Фамилия', sortable: true },
            { key: 'exchangesQuant', label: 'Количество транзакций', sortable: true },
            { key: 'exchangesSum', label: 'Общая сумма переводов', sortable: true }
          ],
          currentPage: 1,
          perPage: 10,
          totalRows: users.length,
          pageOptions: [ 10, 15, 20 ],
          filter: null
        }
      }
    },

    methods: {
      onFiltered (filteredItems) {
        this.usersTable.totalRows = filteredItems.length
        this.usersTable.currentPage = 1
      },
      userRowClickedHandler (item) {
        this.$router.push('/admin/users/' + item.id)
      }
    }
  }
</script>

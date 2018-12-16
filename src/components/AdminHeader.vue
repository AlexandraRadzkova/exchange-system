<template>
  <header class="main-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <b-navbar type="dark" toggleable>
            <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
            <b-navbar-brand to="/admin" exact></b-navbar-brand>
            <b-collapse is-nav id="nav_dropdown_collapse">
              <b-navbar-nav>
                <b-nav-item to="/admin/transactions">Транзакции</b-nav-item>
                <b-nav-item to="/admin/users">Пользователи</b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav class="ml-auto">
                <b-nav-item to="/" exact right><i class="fa fa-sign-out" style="font-size: 25px;"></i></b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>

        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'AdminHeader'
  }
</script>

<style lang="sass">
  .main-header
    .navbar-brand
      background-image: url("../assets/img/logo.svg")
</style>

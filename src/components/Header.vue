<template>
  <header class="main-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <b-navbar type="dark" toggleable>
            <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
            <b-navbar-brand to="/" exact></b-navbar-brand>
          </b-navbar>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="sass">
  .main-header
    .navbar-brand
      background-image: url("../assets/img/logo.svg")
</style>

<template>
  <header class="main-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <b-navbar type="dark" toggleable>
            <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_dropdown_collapse">
              <b-navbar-nav>
                <b-nav-item to="/exchange" exact>Обмен</b-nav-item>
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
    name: 'Header'
  }
</script>

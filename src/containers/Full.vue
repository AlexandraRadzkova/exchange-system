<template>
  <div class="main-wrap">

    <AppHeader />

    <main class="main">
      <router-view></router-view>
    </main>

    <AppFooter />

  </div>
</template>

<script>
  import { Header as AppHeader, Footer as AppFooter } from '../components'

  export default {
    name: 'Full',

    components: {
      AppHeader,
      AppFooter
    }
  }
</script>

<template>
  <div class="main-wrap">
    <HomeHeader/>

    <main class="main">
      <router-view></router-view>
    </main>

    <AppFooter/>
  </div>
</template>

<script>
import { HomeHeader, Footer as AppFooter } from '../components'

export default {
  name: 'Full',

  components: {
    HomeHeader,
    AppFooter,
  },
}
</script>

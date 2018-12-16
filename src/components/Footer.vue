<template>
  <footer class="main-footer">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="footer-wrapper">
            <div class="row">
              <div class="col-sm-6">
                <p class="copyright-text">© Exchange System 2017</p>
              </div>
              <div class="col-sm-6 adminAccessBtn-col">
                <b-button
                  id="adminAccessBtn"
                  ref="adminAccessBtn"
                  @click="adminAccessBtnClickHandler"
                  variant="warning"
                  data-style="expand-right"
                  data-spinner-size="30"
                  data-spinner-color="#34383C"
                >
                  <span class="ladda-label">Административная панель</span>
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { eventBus } from '../main'

import Ladda from 'ladda'

export default {
  name: 'Footer',

  methods: {
    adminAccessBtnClickHandler() {
      let adminToken = sessionStorage.getItem('adminToken')

      if (!adminToken) {
        eventBus.$emit('openAdminAccessModal')
      } else {
        let adminAccessBtn = Ladda.create(this.$refs.adminAccessBtn)
        adminAccessBtn.start()

        this.axios
          .get('/users/me', {
            headers: { authorization: adminToken },
          })
          .then((response) => {
            adminAccessBtn.stop()

            if (response.data.isAdmin) {
              this.$router.push('/admin')
            } else {
              eventBus.$emit('openAdminAccessModal')
            }
          })
      }
    },
  },
}
</script>

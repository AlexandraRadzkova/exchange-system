<template>
  <div>
    <b-modal
      id="adminAccessModal"
      ref="adminAccessModal"
      header-bg-variant="info"
      header-text-variant="light"
      title="Войти"
    >
      <form @submit.prevent="enterAdminPanel" data-vv-scope="adminAccessModal">
        <b-form-group
          label="Пароль:"
          :state="errors.has('adminAccessModal.admin_password') ? false : null"
        >
          <b-form-input
            type="password"
            v-model="adminAccessPassword"
            data-vv-name="admin_password"
            data-vv-as="'Пароль'"
            v-validate="'required'"
            :state="errors.has('adminAccessModal.admin_password') ? false : null"
            placeholder="Введите пароль"
          />
          <p
            class="text-danger mb-0"
            v-show="errors.has('adminAccessModal.admin_password')"
          >{{ errors.first('adminAccessModal.admin_password') }}</p>
        </b-form-group>
      </form>

      <template slot="modal-footer">
        <b-button
          type="submit"
          @click="enterAdminPanel"
          ref="enterAdminPanelBtn"
          class="ladda-button"
          size="md"
          variant="info"
          data-style="expand-right"
          data-spinner-size="30"
        >
          <span class="ladda-label">Войти</span>
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Ladda from 'ladda'

import { eventBus } from '../../../main'

export default {
  name: 'auth-modal',

  inject: ['$validator'],

  data() {
    return {
      adminAccessPassword: null,
    }
  },

  methods: {
    enterAdminPanel(e) {
      e.preventDefault()

      this.$validator.validateAll('adminAccessModal').then((result) => {
        if (result) {
          let submitBtn = Ladda.create(this.$refs.enterAdminPanelBtn)
          submitBtn.start()

          this.axios
            .post('/auth/sign-in', {
              password: this.adminAccessPassword,
            })
            .then((response) => {
              submitBtn.stop()

              if (response.data.success) {
                sessionStorage.setItem('adminToken', response.data.token)

                this.$refs.adminAccessModal.hide()

                this.$router.push('/admin')
              } else {
                this.$toastr.error('Неверный пароль')
              }
            })
        }
      })
    },
  },

  mounted() {
    eventBus.$on('openAdminAccessModal', () => {
      this.$refs.adminAccessModal.show()
    })
  },
}
</script>

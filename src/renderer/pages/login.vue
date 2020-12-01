<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-form>
                <v-text-field
                  v-model="form.data.email"
                  label="Enter your e-mail address"
                  required
                />
                <v-text-field
                  v-model="form.data.password"
                  label="Enter your password"
                  min="8"
                  :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="e1 ? 'password' : 'text'"
                  counter
                  required
                  @click:append="() => (e1 = !e1)"
                />
                <v-layout justify-space-between>
                  <v-btn class="blue darken-4 white--text" @click="login">
                    Login
                  </v-btn>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { extractErrors } from '~/lib'
const { dialog } = require('electron').remote
export default {
  components: {},
  middleware: 'guest',
  data () {
    return {
      form: {
        data: { email: '', password: '' },
        valid: false,
        status: { submiting: false }
      },
      e1: false
    }
  },

  methods: {
    async login () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.form.data.email,
            password: this.form.data.password
          }
        })

        this.$router.push('/')
      } catch (e) {
        dialog.showErrorBox(
          'Oops',
          extractErrors(e.response, 'Unable to login', '')
        )
      }
    }
  }
}
</script>

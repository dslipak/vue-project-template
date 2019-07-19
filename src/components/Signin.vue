<template>
  <v-container fluid fill-height class="container">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card flat>

          <v-chip label color="grey darken-4" text-color="white" class="signin-header">
            <v-icon left>security</v-icon><span class="title">Signin</span>
          </v-chip>

          <v-card-text>
            <v-form @submit.prevent="signin">
              <v-text-field v-model="email" prepend-icon="person" name="email" label="Email" type="text" :rules="[rules.required, rules.email]"></v-text-field>
              <v-text-field v-model="pass" id="password" prepend-icon="lock" name="password" label="Password" type="password" :rules="[rules.required]"></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn flat @click="signin">sign in</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-footer app fixed>
      <v-layout
        justify-center
        row
        wrap
      >
        <span class="caption" v-html="footerText"></span>
      </v-layout>
    </v-footer>
  </v-container>
</template>

<script>
import common from '@/helpers/common'  
import auth from '@/auth'
export default {
  data () {
    return {
      footerText: "&copy; " + 
        common.getFullYear() + 
        " ALL RIGHTS RESERVED",
      email: 'joe@example.com',
      pass: '',
      error: false,
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  methods: {
    signin () {
      auth.signin(this.email, this.pass, signedIn => {
        if (!signedIn) {
          this.error = true
        } else {
          this.$router.replace(this.$route.query.redirect || '/')
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
.error {
  color: red;
}
.signin-header {
  width: 100%;
  margin-left: 20px;
  right: 20px;
  height: 80px;
  top: -20px;
}
</style>

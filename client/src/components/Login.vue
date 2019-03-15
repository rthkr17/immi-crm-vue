<template>
  <v-container>
    <v-layout
      class="cont"
      grid-list-md
      text-xs-center
    >
      <v-flex xs10 offset-xs1 sm6 offset-sm3 ma-auto>
        <div class="white elevation-4" style="border-radius:5px 5px 5px 5px">
          <v-toolbar
            class="primary"
            style="border-radius:5px 5px 0px 0px"
          >
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
              <v-toolbar-title class="secondary--text text-uppercase" style="font-family:Source Sans Pro;font-weight:400">Log in</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div class="pl-2 pr-4 pt-4 pb-4">
            <v-flex xs10 offset-xs1 sm6 offset-sm3 md6 offset-md3>
              <v-text-field
                prepend-icon="person"
                label="Email"
                type="email"
                v-model="email"
                name="email"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs10 offset-xs1 sm6 offset-sm3 md6 offset-md3>
              <v-text-field
                prepend-icon="lock"
                label="Password"
                type="password"
                v-model="password"
                name="password"
                @keyup.enter="login"
                required
              ></v-text-field>
            </v-flex>
            <br>
            <div class="err" v-html="error" />
            <br>
            <v-btn
              @click="login"
              class="accent"
            >
              Login
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import AuthenticationService from '@/services/AuthenticationService'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('/dashboard')
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cont{
    margin-top:100px;
  }
  .err{
    color:red;
  }
</style>

<template>
  <v-layout class="cont" colmun>
    <v-flex xs10 offset-xs1 sm6 offset-sm3 ma-auto>
      <div class="white elevation-4" style="border-radius:5px 5px 5px 5px">
        <v-toolbar
          class="primary"
          style="border-radius:5px 5px 0px 0px"
        >
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
            <v-toolbar-title class="white--text text-uppercase" style="font-weight:300">Create Account</v-toolbar-title>
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
              autocomplete="off"
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
              @keyup.enter="register"
              required
            ></v-text-field>
          </v-flex>
          <br>
          <div class="err" v-html="error" />
          <br>
          <v-btn
            @click="register"
            class="secondary"
          >
            Sign Up
          </v-btn>
          <v-btn
            @click="navigateTo('/login')"
            class="accent"
          >
            Sign in
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>

import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('/dashboard')
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cont{
    margin-top:60px;
  }
  .err{
    color:red;
  }</style>

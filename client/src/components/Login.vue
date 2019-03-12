<template>
  <v-layout class="cont" colmun>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar
          class="black"
          dark
        >
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
            <v-toolbar-title class="white--text">Login</v-toolbar-title>
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
              required
            ></v-text-field>
          </v-flex>
          <br>
          <div class="err" v-html="error" />
          <br>
          <v-btn
            color="primary" dark
            @click="login"
          >
            Login
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
    async login () {
      try {
        await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
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
    margin-top:60px;
  }
  .err{
    color:red;
  }
</style>

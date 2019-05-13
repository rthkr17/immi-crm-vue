<template>
  <v-container>
    <v-layout
      class="cont"
      grid-list-md
      text-xs-center
    >
      <v-flex xs10 offset-xs1 sm6 offset-sm3 ma-auto>
        <div class="white elevation-0" style="border-radius:5px 5px 5px 5px">
          <v-flex
            style="line-height:2; font:300 3rem Avenir"
            class="headline">
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
              Create Your Account
          </v-flex>
          <div class="pl-2 pr-4 pt-4 pb-4">
            <v-flex xs10 offset-xs1>
              <v-text-field
                prepend-icon="person"
                label="Name"
                type="name"
                v-model="name"
                name="name"
                autocomplete="off"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs10 offset-xs1>
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
            <v-flex xs10 offset-xs1>
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
            <v-btn
              @click="register"
              large
              class="secondary"
            >
              Sign Up
            </v-btn>
            <br>
            <a
              @click="navigateTo('/login')"
              class="signin"
            >
              Sign in instead
            </a>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          name: this.name,
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
    margin-top:100px;
  }
  .err{
    color:red;
  }
  .signin{
    font-size:1em;
    line-height:2;
    transition:.5s;
    color:#FF5722;
    margin-bottom:2px;
  }
  .signin:hover {
    opacity:9;
    border-bottom: 1px solid #FF5722;
  }
</style>

<template>
  <div>
    <h1 class="title">Register</h1>
    <br>
    <input
      type="email"
      v-model="email"
      name="email"
      placeholder="email"
    />
    <br>
    <input
      type="password"
      v-model="password"
      name="password"
      placeholder="password"
    />
    <br>
    <div class="error" v-html="error" />
    <br>
    <button
      @click="register">
      Register
    </button>
    <div>email entered : {{ email }}</div>
    <div>password entered : {{ password }}</div>
  </div>
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
        await AuthenticationService.register({
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
.error{
  color:red;
}
</style>

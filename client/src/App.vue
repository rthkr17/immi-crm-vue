<template>
    <v-app id="app">
      <!-------------------------->
      <nav-drawer
      ></nav-drawer>
      <!-------------------------->
      <!-------------------------->
      <!-------------------------->
      <v-content class="elevation-2">
        <v-container
          grid-list-xl
          text-xs-center
        >
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
import NavDrawer from '@/components/NavDrawer'
export default {
  components: {
    NavDrawer
  },
  name: 'App',
  data: () => ({
    drawer: null
  })
}
</script>

<style>
.v-navigation-drawer__border {
  display:none;
}
* {
  transition:.2s;
}
#app {
  font-family: 'Source Sans Pro','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>

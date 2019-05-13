<template>
    <v-app id="app" dense>
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
          class="containerClass"
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
.bold {
    font-weight:800;
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
thead {
  background-color:#E0F2F1;
}
tbody tr:nth-of-type(odd) {
   background-color: rgba(10, 30, 20, .02);
 }
tbody tr:nth-of-type(even) {
   background-color: rgba(255, 255, 252, 1);
 }
</style>

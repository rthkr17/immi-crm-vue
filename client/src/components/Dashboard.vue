<template>
  <v-app>
    <!-------------------------->
    <!-------------------------->
    <!-------------------------->
    <div
      v-if="$store.state.isUserLoggedIn"
      class="cont"
    >
      <v-layout row>
        <v-flex
          xs12
          sm12
          md8
          lg8
        >
          <app-list-table></app-list-table>
        </v-flex>
        <v-flex
          class="hidden-sm-and-down"
          xs12
          md4
          lg4
        >
          <task-list></task-list>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex
          sm12
          md6
          class="hidden-md-and-up"
          >
          <message-list></message-list>
        </v-flex>
        <v-flex
          class="hidden-sm-and-down"
          sm12
          md6
        >
          <todo-list></todo-list>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex
          sm12
          style="margin-top:-20px"
        >
          <calender></calender>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex
          class="hidden-md-and-up"
          xs12
          md4
          lg4
        >
          <task-list></task-list>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex
          class="hidden-sm-and-down"
          sm12
          md6
        >
          <message-list></message-list>
        </v-flex>
        <v-flex sm12 md6>
          <notif-list></notif-list>
        </v-flex>
      </v-layout>
    </div>
    <!-- <v-footer app>c - 2019</v-footer> -->
  </v-app>
</template>

<script>
import AppListTable from '@/components/AppListTable'
import MessageList from '@/components/MessageList'
import NotifList from '@/components/NotifList'
import TaskList from '@/components/TaskList'
import Calender from '@/components/Calender'
import Login from '@/components/Login'
import Todo from '@/components/Todo'
import PageHeader from '@/components/PageHeader'
import NavDrawer from '@/components/NavDrawer'

export default {
  components: {
    AppListTable,
    MessageList,
    NotifList,
    TaskList,
    Calender,
    Login,
    Todo,
    PageHeader,
    NavDrawer
  },
  data: () => ({
    dialog: false
  }),
  props: {
    source: String
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

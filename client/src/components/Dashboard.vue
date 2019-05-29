<template>
  <v-app>
    <!-------------------------->
    <!-------------------------->
    <!-------------------------->
    <div
      v-if="$store.state.isUserLoggedIn"
      class="cont"
    >
      <v-layout row wrap>
        <v-flex
          xs12
          md6
          lg6
        >
          <app-list-dash></app-list-dash>
        </v-flex>
        <v-flex
          xs12
          sm12
          md6
          lg6
        >
          <messages-dash></messages-dash>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex
          xs12
          sm8
        >
          <tasks-dash></tasks-dash>
        </v-flex>
        <v-flex
          xs12
          sm4
        >
          <staff></staff>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex
          xs12
          sm5
        >
          <schedules-dash></schedules-dash>
        </v-flex>
        <v-flex
          xs12
          sm7
        >
          <calender></calender>
        </v-flex>
      </v-layout>
      <!-- <v-layout row wrap>
        <v-flex
          sm12
          md6
          >
          <message-list></message-list>
        </v-flex>
        <v-flex
          xs12
          md4
          lg4
        >
          <task-list></task-list>
        </v-flex>
      </v-layout> -->
    </div>
    <!-- <v-footer height="5%" app class="primary secondary--text justify-center">
      <div class="title font-weight-light">Copyright - 2019</div>
    </v-footer> -->
  </v-app>
</template>

<script>
import AppListDash from '@/components/AppListDash'
import MessageList from '@/components/MessageList'
import NotifList from '@/components/NotifList'
import TaskList from '@/components/TaskList'
import Calender from '@/components/Calender'
import Login from '@/components/Login'
import Todo from '@/components/Todo'
import PageHeader from '@/components/PageHeader'
import NavDrawer from '@/components/NavDrawer'
import MessagesDash from '@/components/MessagesDash'
import TasksDash from '@/components/TasksDash'
import Staff from '@/components/Staff'
import SchedulesDash from '@/components/SchedulesDash'

export default {
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
  },
  components: {
    AppListDash,
    MessageList,
    NotifList,
    TaskList,
    Calender,
    Login,
    Todo,
    PageHeader,
    NavDrawer,
    MessagesDash,
    TasksDash,
    Staff,
    SchedulesDash
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

<template>
  <v-app>
    <!-------------------------->
    <nav-drawer></nav-drawer>
    <!-------------------------->
    <page-header/>
    <!-------------------------->
    <v-content class="elevation-2">
      <v-container
        v-if="!$store.state.isUserLoggedIn"
        grid-list-md
        text-xs-center
      >
        <login style ="margin-top:100px;" ma-auto></login>
      </v-container>
      <v-container
        v-if="$store.state.isUserLoggedIn"
        grid-list-xl
        text-xs-center
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
      </v-container>
    </v-content>
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
    dialog: false,
    accountslists: [
      { title: 'Account', url: '/profile' },
      { title: 'Sign Out', url: '/logout' },
      { title: 'Settings', url: '/settings' }
    ],
    msglists: [
      { header: 'Messages - Today' },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
        subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
        subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try',
        subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ],
    notiflists: [
      { header: 'Notifications - Today' },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
        subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
        subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try',
        subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ]
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

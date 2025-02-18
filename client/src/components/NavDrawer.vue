<template>
<div>
  <v-navigation-drawer
      app
      v-if="$store.state.isUserLoggedIn"
      width=230
      :mini-variant.sync="mini"
      mini-variant-width=30
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      class="grey lighten-4 text-uppercase"
    >
    <v-list>
      <template  v-for="item in items">
        <v-layout
          v-if="item.heading"
          :key="item.heading"
          row
          align-center
          style="cursor:pointer;"
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-content
                 style="float:right;padding-left:-60px"
              >
                <v-icon>
                  {{ item.iconRight }}
                </v-icon>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            @click="navigateTo(child.url)"
            style="padding-left:4%;"
          >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile
          v-else :key="item.text"
          @click="navigateTo(item.url)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar
    app
    fixed
    color="primary"
    :clipped-left="$vuetify.breakpoint.lgAndUp"
  >
    <v-toolbar-side-icon class="secondary--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>

    <v-toolbar-title style="width: 250px; text-align:left; font-weight:400" class="ml-0 pl-3 headline text-uppercase secondary--text">Immify</v-toolbar-title>
    <v-text-field
      v-if="$store.state.isUserLoggedIn"
      flat
      solo-inverted
      hide-details
      v-model="searchquery"
      prepend-inner-icon="search"
      label="Search"
      @keyup.enter="search"
      class="hidden-sm-and-down"
    ></v-text-field>

    <v-spacer></v-spacer>
    <div
      v-if="$store.state.isUserLoggedIn"
      class="secondary--text subheading"
      id="currentTime"
    >
    </div>
    <v-menu
      offset-y
      v-if="$store.state.isUserLoggedIn"
    >
      <template v-slot:activator="{ on }">
        <v-icon class="ml-4" v-on="on">message</v-icon>
      </template>
      <v-list three-line>
        <template v-for="(msglist, index) in msglists">
          <v-subheader
            v-if="msglist.header"
            :key="msglist.header"
          >
            {{ msglist.header }}
          </v-subheader>

          <v-divider
            v-else-if="msglist.divider"
            :key="index"
            :inset="msglist.inset"
          ></v-divider>

          <v-list-tile
            v-else
            :key="msglist.title"
            avatar
            @click="damn"
          >
            <v-list-tile-avatar>
              <img :src="msglist.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="msglist.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="msglist.subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-menu>
    <v-menu
      offset-y
      v-if="$store.state.isUserLoggedIn"
    >
      <template v-slot:activator="{ on }">
        <v-icon class="ml-4" v-on="on">notification_important</v-icon>
      </template>
      <v-list three-line>
        <template v-for="(notiflist, index) in notiflists">
          <v-subheader
            v-if="notiflist.header"
            :key="notiflist.header"
          >
            {{ notiflist.header }}
          </v-subheader>

          <v-divider
            v-else-if="notiflist.divider"
            :key="index"
            :inset="notiflist.inset"
          ></v-divider>

          <v-list-tile
            v-else
            :key="notiflist.title"
            avatar
            @click="damn"
          >
            <v-list-tile-avatar>
              <img :src="notiflist.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="notiflist.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="notiflist.subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-menu>

    <v-menu
      dark
      offset-y
      v-if="$store.state.isUserLoggedIn"
    >
      <template v-slot:activator="{ on }">
        <v-icon large class="ml-4" v-on="on">account_circle</v-icon>
      </template>
      <v-list>
        <v-list-tile
          v-for="(accountslist, index) in accountslists"
          :key="index"
        >
            <v-list-tile-title
              @click="doStuff(accountslist)"
              style="cursor: pointer"
            >
              {{ accountslist.title }}
            </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn
      class="hidden-sm-and-down button"
      flat
      color="secondary"
      v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo('/register')"
    >
      Features
    </v-btn>
    <v-btn
      class="hidden-sm-and-down button"
      flat
      color="secondary"
      v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo('/register')"
    >
      Pricing
    </v-btn>
    <v-btn
      class="hidden-sm-and-down button"
      flat
      color="secondary"
      v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo('/register')"
    >
      About
    </v-btn>
    <v-btn
      class="secondary hidden-sm-and-down button"
      flat
      v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo('/login')"
    >
      Log in
    </v-btn>
    <!-- <v-btn
      flat
      large
      style="color:#203040"
      v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo('/register')"
    >
      Sign Up
    </v-btn> -->
    <v-btn
      flat
      class="accent button"
      v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo('/register')"
    >
      Try for free
    </v-btn>
  </v-toolbar>
</div>
</template>

<script>
const moment = require('moment')
var update = function () {
  document.getElementById('currentTime')
    .innerHTML = moment().format('MMMM Do, h:mm a')
}
setInterval(update, 1000)
export default {
  data: () => ({
    dialog: false,
    drawer: null,
    currentTime: null,
    items: [
      { icon: 'home', text: 'Dashboard', url: '/dashboard' },
      {
        icon: 'assignment',
        text: 'Applications',
        'icon-alt': 'assignment',
        model: false,
        children: [
          { text: 'Application List', url: '/applications' },
          { text: 'Messages', url: '/messages' },
          { text: 'Retainers', url: '/retainers' },
          { text: 'Tasks', url: '/tasks' }
        ]
      },
      { icon: 'history', text: 'Schedules', url: '/schedules' },
      {
        icon: 'settings',
        text: 'Settings',
        'icon-alt': 'settings',
        model: false,
        children: [
          { text: 'Profile', url: '/profile' },
          { text: 'Chenge Password', url: '/reset-password' }
        ]
      },
      { icon: 'chat_bubble', text: 'Send feedback', url: '/feedback' },
      { icon: 'help', text: 'Help', url: '/help' }
    ],
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
    },
    doStuff (accountslist) {
      if (accountslist.url === '/logout') {
        this.$store.state.isUserLoggedIn = false
        this.$store.state.user = null
        this.$store.state.token = null
        this.$router.push('/login')
      } else {
        this.$router.push(accountslist.url)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  font-weight:800
}
.v-icon.material-icons.theme--light {
  float:right;
  position:relative;
}
.v-list__tile__content {
  text-align:right;
}
</style>

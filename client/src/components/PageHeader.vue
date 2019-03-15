<template>
  <v-toolbar
    app
    fixed
    color="primary"
    :clipped-left="$vuetify.breakpoint.lgAndUp"
  >
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

    <v-toolbar-title
      @click="navigateTo('dashboard')"
      style="width: 200px; text-align:left; font-weight:300"
      class="ml-0 pl-3 headline text-uppercase"
    >Immify</v-toolbar-title>
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
              @click="navigateTo(accountslist.url)"
              style="cursor: pointer"
            >
              {{ accountslist.title }}
            </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn
      class="hidden-sm-and-down"
      flat
      color="white"
      v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo('/register')"
    >
      Features
    </v-btn>
    <v-btn
      class="hidden-sm-and-down"
      flat
      color="white"
      v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo('/register')"
    >
      Pricing
    </v-btn>
    <v-btn
      class="hidden-sm-and-down"
      flat
      color="white"
      v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo('/register')"
    >
      About
    </v-btn>
    <v-btn
      class="secondary hidden-sm-and-down"
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
      large
      class="accent"
      v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo('/register')"
    >
      Try for free
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
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
</style>

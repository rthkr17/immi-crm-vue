<template>
  <div>
    <v-card height="100%" class="white elevation-2">
      <v-card-title flat class="white headline font-weight-light">
        Messages
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="messageDialog = true">New</v-btn>
        <v-dialog v-model="messageDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">New Message</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm4>
                    <v-autocomplete
                      v-model="to"
                      :items="contactList"
                      label="To"
                      required
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm8>
                    <v-text-field v-model="subject" label="Subject" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-autocomplete
                      v-model="applicant"
                      :items="applicants"
                      label="Concerned Applicant"
                      multiple
                      required
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea v-model="content" label="Content" required></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="messageDialog = false">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="addMessage(), messageDialog = false">Send</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-card-text class="pa-0">
      <!-------------------------->
      <v-tabs
        show-arrows
        class="secondary--text"
      >
        <v-tabs-slider color="primary"></v-tabs-slider>

        <v-tab
          :href="'#tab-1'"
        >
          Inbox
        </v-tab>
        <v-tab
          :href="'#tab-2'"
        >
          Sent
        </v-tab>
        <v-tabs-items>
          <v-tab-item
            :value="'tab-1'"
          >
            <v-data-table
              :headers="headers"
              :items="messages"
              class="elevation-0"
            >
              <template
                v-slot:items="props"
              >
                <td class="justify-center">{{ props.item.subject }}</td>
                <td class="justify-center">{{ props.item.from }}</td>
                <td class="justify-center" >{{ props.item.createdAt }}</td>
                <td class="justify-center px-0">
                  <v-menu dark offset-y>
                    <template v-slot:activator="{ on }">
                      <v-icon class="ml-4" v-on="on">remove_red_eye</v-icon>
                    </template>
                    <v-list>
                      <v-list-tile
                        v-for="(action, index) in actions"
                        :key="index"
                        style="text-align:right"
                      >
                          <v-list-tile-title
                            @click="setAction(props.item.id, action)"
                            style="cursor: pointer"
                          >
                            {{ action.text }}
                          </v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </td>
              </template>
              <template v-slot:no-data>
                <v-card color="secondary--text elevation-0 title ma-5 font-weight-light" style="background:rgba(0,0,0,0)">No Messages Yet</v-card>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item
            :value="'tab-2'"
          >
            <v-data-table
              :headers="sentHeaders"
              :items="sentMessages"
              class="elevation-0"
            >
              <template
                v-slot:items="props"
              >
                <td class="justify-center">{{ props.item.subject }}</td>
                <td class="justify-center">{{ props.item.to }}</td>
                <td class="justify-center" >{{ props.item.createdAt }}</td>
                <td class="justify-center px-0">
                  <v-menu dark offset-y>
                    <template v-slot:activator="{ on }">
                      <v-icon class="ml-4" v-on="on">remove_red_eye</v-icon>
                    </template>
                    <v-list>
                      <v-list-tile
                        v-for="(action, index) in actions"
                        :key="index"
                        style="text-align:right"
                      >
                          <v-list-tile-title
                            @click="setAction(props.item.id, action)"
                            style="cursor: pointer"
                          >
                            {{ action.text }}
                          </v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </td>
              </template>
              <template v-slot:no-data>
                <v-card color="secondary--text elevation-0 title ma-5 font-weight-light" style="background:rgba(0,0,0,0)">No Messages Yet</v-card>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
        <!-------------------------->
        <!-------------------------->
        <!-------------------------->
    </v-card-text>
    </v-card>
  </div>
</template>
<script>
import MessageService from '@/services/MessageService'
import StaffService from '@/services/StaffService'
import ApplicationsService from '@/services/ApplicationsService'
const moment = require('moment-timezone')
export default {
  data () {
    return {
      items: [
        { icon: 'home', 'icon-alt': 'home', text: 'Inbox', url: '/messages/inbox' },
        { icon: 'send', 'icon-alt': 'send', text: 'Sent', url: '/messages/sent' }
      ],
      from: '',
      to: '',
      subject: '',
      content: '',
      applicant: [],
      error: null,
      actions: [
        {
          text: 'View',
          id: ''
        },
        {
          text: 'Star',
          id: 'star'
        },
        {
          text: 'Delete',
          id: 'delete'
        }
      ],
      messageDialog: false,
      headers: [
        { text: 'Subject', value: 'subject', align: 'center' },
        { text: 'From', value: 'from', align: 'center' },
        { text: 'Date', value: 'createdAt', align: 'center' },
        { text: 'Actions', value: 'actions', align: 'center', sortable: false }
      ],
      sentHeaders: [
        { text: 'Subject', value: 'subject', align: 'center' },
        { text: 'To', value: 'to', align: 'center' },
        { text: 'Date', value: 'createdAt', align: 'center' },
        { text: 'Actions', value: 'actions', align: 'center', sortable: false }
      ],
      messages: [],
      sentMessages: [],
      applications: [],
      applicants: [],
      staff: [],
      staffList: [],
      contactList: []
    }
  },
  async created () {
    this.messages = this.messages.filter(message => {
      return (message.to === this.store.state.user.name)
    })
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  async mounted () {
    this.messages = (await MessageService.getMessages()).data
    for (const key in this.messages) {
      let message = this.messages[key]
      message.createdAt = moment(message.createdAt).format('MMM Do YY')
      message.updatedAt = moment(message.updatedAt).format('MMM Do YY')
    }
    this.applications = (await ApplicationsService.index()).data
    for (const key in this.applications) {
      let application = this.applications[key]
      console.log('Applicants name : ', application.name)
      this.applicants.push(application.name)
    }
    this.staff = (await StaffService.getStaff()).data
    for (const key in this.staff) {
      let oneStaff = this.staff[key]
      console.log('Staff name : ', oneStaff.name)
      this.staffList.push(oneStaff.name)
    }
    this.contactList = this.applicants.concat(this.staffList)
  },
  props: {
    source: String
  },
  methods: {
    async fetchData () {
      this.messages = (await MessageService.getMessages()).data
      this.messages = this.messages.filter(message => {
        return (message.to === this.store.state.user.name)
      })
    },
    async addMessage () {
      try {
        const response = await MessageService.addMessage({
          from: this.$store.state.user.name,
          to: this.to,
          applicant: this.applicant,
          subject: this.subject,
          content: this.content
        })
        console.log(response)
        this.messages = (await MessageService.getMessages()).data
        this.messages = this.messages.filter(message => {
          return (message.to === this.store.state.user.name)
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async setAction (id, action) {
      if (action) {
        console.log(id)
        let url = `messages/${id}/${action.id}`
        this.$router.push(url)
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
</style>

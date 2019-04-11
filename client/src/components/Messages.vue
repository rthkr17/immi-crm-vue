<template>
  <div>
    <v-card height="100%" class="white elevation-2">
      <v-card-title flat class="white headline">
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
                  <v-flex xs12 sm6>
                    <v-text-field v-model="from" label="From" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="to" label="To" required></v-text-field>
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
      <v-data-table
        :headers="headers"
        :items="messages"
        class="elevation-0"
      >
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td class="justify-center">{{ props.item.from }}</td>
          <td class="justify-center">{{ props.item.to }}</td>
          <td class="justify-center" >{{ props.item.content }}</td>
          <td class="justify-center" >{{ props.item.createdAt }}</td>
          <td class="justify-center layout px-0">
            <v-menu dark offset-y>
              <template v-slot:activator="{ on }">
                <v-icon class="ml-4" v-on="on">reorder</v-icon>
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
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import MessageService from '@/services/MessageService'
import ApplicationsService from '@/services/ApplicationsService'
const moment = require('moment')
export default {
  data () {
    return {
      from: '',
      to: '',
      content: '',
      applicant: '',
      error: null,
      actions: [
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
        { text: 'ID', value: 'id' },
        { text: 'From', value: 'from' },
        { text: 'To', value: 'to' },
        { text: 'Content', value: 'content' },
        { text: 'Created', value: 'createdAt' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      messages: [],
      applications: [],
      applicants: []
    }
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
  },
  props: {
    source: String
  },
  methods: {
    async addMessage () {
      try {
        const response = await MessageService.addMessage({
          from: this.from,
          to: this.to,
          content: this.content,
          applicant: this.applicant
        })
        console.log(response)
        this.messages = (await MessageService.getMessages()).data
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

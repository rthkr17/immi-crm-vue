<template>
  <div>
    <v-card height="100%" class="white elevation-2 h-100">
      <v-card-title flat class="white headline font-weight-light">
        Unread Messages
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="navigateTo('messages')">More</v-btn>
      </v-card-title>
      <v-data-table
        height="100%"
        :headers="headers"
        :items="messages"
        class="elevation-0"
        style="height:100%"
      >
        <template v-slot:items="props">
          <td bold class="justify-center font-weight-bold">{{ props.item.subject }}</td>
          <td class="justify-center">{{ props.item.from }}</td>
          <td class="justify-center" >{{ props.item.createdAt }}</td>
        </template>
        <template v-slot:no-data>
          <v-card color="secondary--text elevation-0 title ma-5 font-weight-light" style="background:rgba(0,0,0,0)">No Messages Yet</v-card>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import MessageService from '@/services/MessageService'
import ApplicationsService from '@/services/ApplicationsService'
const moment = require('moment-timezone')
export default {
  data () {
    return {
      from: '',
      to: '',
      subject: '',
      content: '',
      applicant: [],
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
        { text: 'Subject', value: 'subject' },
        { text: 'From', value: 'from' },
        { text: 'Date', value: 'createdAt' }
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
          from: this.$store.state.user.name,
          to: this.to,
          applicant: this.applicant,
          subject: this.subject,
          content: this.content
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

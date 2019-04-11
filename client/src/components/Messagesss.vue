<template>
  <v-card class="white elevation-2">
    <v-card-title flat class="white headline">
      Staff
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            color="primary"
            dark class="mb-2"
            v-on="on"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Add Staff Member</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="from" label="From" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="to" label="To" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete
                    v-model="applicant"
                    :items="applicants"
                    label="Applicant/s concernes"
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
            <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="addMessage(), dialog = false">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-list three-line class="scroll-y" style="max-height:400px">
      <template v-for="item in staff">

        <v-list-tile
          :key="item.id"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.from }}</v-list-tile-title>
            <v-list-tile-sub-title>Assigned to - <b>{{ item.content }}</b></v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action @click="message">
            <v-icon :color="item.online ? 'teal' : 'grey'">chat_bubble</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import MessageService from '@/services/MessageService'
import ApplicationsService from '@/services/ApplicationsService'
export default {
  data () {
    return {
      dialog: false,
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Ranjeet Ranjan &mdash; online',
          subtitle: "<span class='text--primary'>Ongoing cases &mdash; 20</span>"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Ranjeet Ranjan &mdash; online',
          subtitle: "<span class='text--primary'>Ongoing cases &mdash; 20</span>"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Ranjeet Ranjan &mdash; online',
          subtitle: "<span class='text--primary'>Ongoing cases &mdash; 20</span>"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ranjeet Ranjan &mdash; online',
          subtitle: "<span class='text--primary'>Ongoing cases &mdash; 20</span>"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Ranjeet Ranjan &mdash; online',
          subtitle: "<span class='text--primary'>Ongoing cases &mdash; 20</span>"
        }
      ],
      messages: [],
      applicants: [],
      applications: [],
      from: '',
      to: '',
      applicant: '',
      content: '',
      error: null
    }
  },
  methods: {
    async addMessage () {
      try {
        const response = await MessageService.addMessage({
          from: this.from,
          to: this.to,
          applicant: this.applicant,
          content: this.content
        })
        this.messages = (await MessageService.getMessages()).data
        console.log(response)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async message () {
      await console.log('Button clicked.')
    }
  },
  async mounted () {
    this.applications = (await ApplicationsService.index()).data
    for (const key in this.applications) {
      let application = this.applications[key]
      console.log('Applicants name : ', application.name)
      this.applicants.push(application.name)
    }
    this.messages = (await MessageService.getMessages()).data
    console.log('MessageData : ', this.messages)
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

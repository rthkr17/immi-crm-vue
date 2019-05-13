<template>
  <div>
    <v-card height="100%" class="white elevation-2">
      <v-card-title flat class="white headline font-weight-light">
        Retainers
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="retainerDialog = true">New</v-btn>
        <v-dialog v-model="retainerDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">New Retainer</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-autocomplete
                      v-model="applicant"
                      :items="applicants"
                      label="Concerned Applicant"
                      required
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      v-model="totalPayment"
                      label="$"
                      required
                    ></v-text-field>
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
              <v-btn color="blue darken-1" flat @click="retainerDialog = false">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="addRetainer(), retainerDialog = false">Send</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="retainers"
        class="elevation-0"
      >
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td class="justify-center">{{ props.item.consultant }}</td>
          <td class="justify-center">{{ props.item.consultantAcceptedDate }}</td>
          <td class="justify-center">{{ props.item.applicant }}</td>
          <td class="justify-center" >{{ props.item.viewDate }}</td>
          <td class="justify-center" >{{ props.item.applicantAcceptedDate }}</td>
          <td class="justify-center" >{{ props.item.createdAt }}</td>
          <td class="justify-center" >{{ props.item.totalPayment }}</td>
          <td class="justify-center" >{{ props.item.paidPayment }}</td>
          <td class="justify-center px-0">
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
          <v-card color="secondary--text elevation-0 title ma-5 font-weight-light" style="background:rgba(0,0,0,0)">No Retainers Yet</v-card>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import RetainerService from '@/services/RetainerService'
import ApplicationsService from '@/services/ApplicationsService'
const moment = require('moment')
export default {
  data () {
    return {
      consultant: '',
      consultantAcceptedDate: '',
      applicant: '',
      viewDate: '',
      applicantAcceptedDate: '',
      totalPayment: 0,
      paidPayment: 0,
      content: '',
      error: null,
      actions: [
        {
          text: 'View',
          id: 'view'
        },
        {
          text: 'Delete',
          id: 'delete'
        }
      ],
      retainerDialog: false,
      headers: [
        { text: 'Agreement No', value: 'id' },
        { text: 'Consultant', value: 'consultant' },
        { text: 'Accepted', value: 'consultantAcceptedDate' },
        { text: 'Applicant', value: 'applicant' },
        { text: 'Viewed', value: 'viewDate' },
        { text: 'Accepted', value: 'applicantAcceptedDate' },
        { text: 'Created', value: 'createdAt' },
        { text: 'Total Payment', value: 'totalPayment' },
        { text: 'Paid Payment', value: 'paidPayment' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      retainers: [],
      applications: [],
      applicants: []
    }
  },
  async mounted () {
    this.retainers = (await RetainerService.getRetainers()).data
    for (const key in this.retainers) {
      let retainer = this.retainers[key]
      retainer.createdAt = moment(retainer.createdAt).format('MMM Do YY')
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
    async addRetainer () {
      try {
        const response = await RetainerService.addRetainer({
          consultant: this.$store.state.user.name,
          consultantAcceptedDate: moment().format('MMM Do YY'),
          applicant: this.applicant,
          viewDate: '',
          applicantAcceptedDate: '',
          totalPayment: this.totalPayment,
          paidPayment: '',
          content: this.content
        })
        console.log(response)
        this.retainers = (await RetainerService.getRetainers()).data
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async setAction (id, action) {
      if (action) {
        console.log(id)
        let url = `retainers/${id}/${action.id}`
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

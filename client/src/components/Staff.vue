<template>
  <v-card height="100%" class="white elevation-2">
    <v-card-title flat class="headline font-weight-light" style="background-color:#e9faf7">
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
                  <v-text-field v-model="name" label="Name" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="email" label="Email*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete
                    v-model="assignedApplicants"
                    :items="applicants"
                    label="Assign Applicants"
                    multiple
                    required
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete
                  v-model="assignedStaff"
                    :items="staffList"
                    label="Assign Staff"
                    multiple
                    required
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="addStaff(), dialog = false">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-list small one-line class="scroll-y">
      <template class="listContainer" v-for="item in staff">

        <v-list-tile
          class="listRow"
          :key="item.id"
        >
          <v-list-tile-content>
            <v-list-tile-title class="secondary--text">{{ item.name }}</v-list-tile-title>
            <v-list-tile-sub-title class="font-weight-light">Assigned to
              <b
                v-for="assignedApplicant in item.assignedApplicants"
                :key="assignedApplicant"
              >
                {{ " - " + assignedApplicant }}
            </b></v-list-tile-sub-title>
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
import ApplicationsService from '@/services/ApplicationsService'
import StaffService from '@/services/StaffService'
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
      staff: [],
      applicants: [],
      staffList: [],
      applications: [],
      name: '',
      email: '',
      assignedApplicants: '',
      assignedStaff: '',
      error: null
    }
  },
  methods: {
    async addStaff () {
      try {
        const response = await StaffService.addStaff({
          name: this.name,
          email: this.email,
          assignedApplicants: this.assignedApplicants,
          assignedStaff: this.assignedStaff
        })
        this.staff = (await StaffService.getStaff()).data
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
    this.staff = (await StaffService.getStaff()).data
    for (const key in this.staff) {
      let oneStaff = this.staff[key]
      console.log('Staff name : ', oneStaff.name)
      this.staffList.push(oneStaff.name)
    }
    console.log('StaffData : ', this.staff)
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-list {
  padding-top:0;
  padding-bottom:0;
}
.v-list .listRow:nth-of-type(odd) {
   background-color: rgba(10, 30, 20, .02);
 }
.v-list .listRow:nth-of-type(even) {
   background-color: rgba(255, 255, 252, 1);
 }
</style>

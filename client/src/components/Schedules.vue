<template>
  <div>
    <v-card height="100%" class="white elevation-2">
      <v-card-title flat class="white headline">
        Schedules
        <v-spacer></v-spacer>
        <v-btn color="secondary" dark class="mb-2" @click="configFolder">Configure</v-btn>
        <v-btn color="primary" dark class="mb-2" @click="scheduleDialog = true">New</v-btn>
        <v-dialog v-model="scheduleDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">New Schedule</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-autocomplete
                      v-model="applicant"
                      :items="applicants"
                      label="Concerned Applicant"
                      multiple
                      required
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm6 m4>
                    <v-dialog
                      ref="dateDialog"
                      v-model="dateModal"
                      :return-value.sync="date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="Pick a Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="dateModal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dateDialog.save(date), dateModal = false">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-dialog
                      ref="timeDialog"
                      v-model="timeModal"
                      :return-value.sync="time"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="time"
                          label="Pick a Time"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker v-model="time" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="timeModal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.timeDialog.save(time),timeModal = false">OK</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                   <v-flex xs12 sm6 md4>
                    <v-autocomplete
                      v-model="duration"
                      :items="durationSet"
                      label="Duration"
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
              <v-btn color="blue darken-1" flat @click="scheduleDialog = false">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="addSchedule(), scheduleDialog = false">Send</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="schedules"
        class="elevation-0"
      >
        <template v-slot:items="props">
          <td>{{ props.item.staffTime }}</td>
          <td>{{ props.item.applicantTime }}
            <!-- <div class="text-xs-center">
              <v-dialog
                v-model="activityDialog"
                width="500"
              >
                <v-card>
                  <v-card-title
                    class="headline primary secondary--text"
                    primary-title
                  >
                    Activity History for {{ props.item.applicant }}
                  </v-card-title>

                  <v-card-text
                    v-for="(activity) in props.item.activityList"
                    :key="activity"
                  >
                    {{activity.name}}
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      flat
                      @click="activityDialog = false"
                    >
                      Back
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div> -->
          </td>
          <td>{{ props.item.duration }}</td>
          <td>{{ props.item.applicant }}</td>
          <td>{{ props.item.consultant }}</td>
          <td class="justify-center">
            <template>
              <v-btn
                icon
                class="primary--text"
                dark
                @click="docDialog = true"
              >
                <v-icon
                >
                  alarm_add
                </v-icon>
              </v-btn>
            </template>
            <div class="text-xs-center">
              <v-dialog
                v-model="docDialog"
                width="500"
              >
                <v-card>
                  <v-card-title
                    class="headline primary secondary--text"
                    primary-title
                  >
                    Select Time for {{ props.item.name }}
                  </v-card-title>

                  <v-card-text
                    v-for="(doc) in props.item.documents"
                    :key="doc.id"
                  >
                    <v-checkbox
                      :label="`${doc.url}`"
                    >
                      {{doc.url}}
                    </v-checkbox>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      flat
                      @click="docDialog = false"
                    >
                      Back
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </td>
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
import SchedulesService from '@/services/SchedulesService'
import ApplicationsService from '@/services/ApplicationsService'
let moment = require('moment')
export default {
  data: () => ({
    staffTime: '',
    applicantTime: '',
    duration: null,

    dateModal: false,
    timeModal: false,
    actions: [
      {
        text: 'Create Note',
        id: 'cn'
      },
      {
        text: 'View Notes',
        id: 'vn'
      },
      {
        text: 'Follow Up',
        id: 'fu'
      },
      {
        text: 'Contact Info',
        id: 'ci'
      },
      {
        text: 'Delete',
        id: 'dl'
      }
    ],
    durationSet: [30, 60],
    scheduleDialog: false,
    docDialog: false,
    headers: [
      { text: 'Consultant/Staff Time', value: 'staffTime' },
      { text: 'Applicant Time', value: 'applicantTime' },
      { text: 'Duration (mins)', value: 'duration' },
      { text: 'Applicant', value: 'applicant' },
      { text: 'Consultant', value: 'consultant' },
      { text: 'Select Time', value: 'selectTime' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    schedules: [],
    applications: [],
    applicants: []
  }),
  async mounted () {
    this.schedules = (await SchedulesService.getSchedules()).data
    this.applications = (await ApplicationsService.index()).data
    for (const key in this.schedules) {
      let schedule = this.schedules[key]
      schedule.createdAt = moment(schedule.createdAt).format('MMMM Do YYYY, h:mm:ss a')
      schedule.updatedAt = moment(schedule.updatedAt).format('MMMM Do YYYY, h:mm:ss a')
      schedule.staffTime = moment(schedule.staffTime).format('MMMM Do YYYY, h:mm:ss a')
      schedule.applicantTime = moment(schedule.applicantTime).format('MMMM Do YYYY, h:mm:ss a')
      schedule.selecTime = moment(schedule.selectTime).format('MMMM Do YYYY, h:mm:ss a')
    }
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
    async addSchedule () {
      try {
        const response = await SchedulesService.addSchedule({
          staffTime: this.staffTime.tz('America/Los_Angeles').format('ha z'),
          applicantTime: this.applicantTime.tz('America/Los_Angeles').format('ha z'),
          applicant: this.applicant,
          consultant: this.$store.state.user.name,
          duration: this.duration,
          selectTime: this.date + ' ' + this.time

        })
        console.log(response)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async setAction (id, action) {
      if (action) {
        console.log(id)
        let url = `applications/${id}/${action.id}`
        this.$router.push(url)
      }
    },
    showHistory (item) {
      console.log('yoyoyoyo')
      this.activityDialog = true
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

<template>
  <div>
    <v-card height="100%" class="white elevation-2">
      <v-card-title flat class="white headline font-weight-light">
        Upcoming Schedules
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="navigateTo('schedules')">More</v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="schedules"
        class="elevation-0"
      >
        <template v-slot:items="props">
          <td>{{ props.item.staffTime }}</td>
          <td>{{ props.item.applicant }}</td>
          <td>{{ props.item.duration }}</td>
        </template>
        <template v-slot:no-data>
          <v-card color="secondary--text elevation-0 title ma-5 font-weight-light" style="background:rgba(0,0,0,0)">No Schedules Yet</v-card>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import SchedulesService from '@/services/SchedulesService'
import ApplicationsService from '@/services/ApplicationsService'
let moment = require('moment-timezone')
export default {
  data: () => ({
    selectedDate: '',
    selectedTime: '',
    staffTime: '',
    applicantTime: '',
    applicant: [],
    consultant: '',
    duration: [],
    dateModal: false,
    timeModal: false,
    error: null,
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
      { text: 'Applicant', value: 'applicant' },
      { text: 'Duration (mins)', value: 'duration' }
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
      schedule.staffTime = moment(schedule.staffTime).format('MMMM Do, h:mm a')
      schedule.applicantTime = moment(schedule.applicantTime).format('MMMM Do, h:mm a')
      schedule.selectTime = moment(schedule.selectTime).format('MMMM Do YYYY, h:mm:ss a')
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
          staffTime: moment.tz((this.selectedDate + ' ' + this.selectedTime), 'America/New_York'),
          applicantTime: moment.tz((this.selectedDate + ' ' + this.selectedTime), 'America/Los_Angeles'),
          applicant: this.applicant,
          consultant: this.$store.state.user.name,
          duration: this.duration,
          selectTime: this.selectedDate + ' ' + this.selectedTime
        })
        this.schedules = (await SchedulesService.getSchedules()).data
        console.log(response)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async setAction (id, action) {
      if (action) {
        console.log(id)
        let url = `schedules/${id}/${action.id}`
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

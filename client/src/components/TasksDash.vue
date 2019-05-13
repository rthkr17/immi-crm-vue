<template>
  <div>
    <v-card height="100%" class="white elevation-2">
      <v-card-title flat class="white headline font-weight-light">
        Tasks
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="navigateTo('tasks')">More</v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="tasks"
        class="elevation-0"
      >
        <template v-slot:items="props">
          <td class="justify-center">{{ props.item.regarding }}</td>
          <td class="justify-center">{{ props.item.applicant }}</td>
          <td class="justify-center">{{ props.item.subject }}</td>
          <td class="justify-center" >{{ props.item.createdAt }}</td>
        </template>
        <template v-slot:no-data>
          <v-card color="secondary--text elevation-0 title ma-5 font-weight-light" style="background:rgba(0,0,0,0)">No Tasks Yet</v-card>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import TaskService from '@/services/TaskService'
import ApplicationsService from '@/services/ApplicationsService'
const moment = require('moment')
export default {
  data () {
    return {
      regarding: '',
      applicant: '',
      assignto: '',
      subject: '',
      message: '',
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
      taskDialog: false,
      headers: [
        { text: 'Regarding', value: 'regarding' },
        { text: 'Applicant', value: 'applicant' },
        { text: 'Subject', value: 'subject' },
        { text: 'Date', value: 'createdAt' }
      ],
      tasks: [],
      applications: [],
      applicants: []
    }
  },
  async mounted () {
    this.tasks = (await TaskService.getTasks()).data
    for (const key in this.tasks) {
      let task = this.tasks[key]
      task.createdAt = moment(task.createdAt).format('MMM Do YY')
      task.updatedAt = moment(task.updatedAt).format('MMM Do YY')
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
    async addTask () {
      try {
        const response = await TaskService.addTask({
          regarding: this.regarding,
          applicant: this.applicant,
          assignto: this.assignto,
          subject: this.subject,
          message: this.message
        })
        this.tasks = (await TaskService.getTasks()).data
        console.log(response)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async setAction (id, action) {
      if (action) {
        console.log(id)
        let url = `tasks/${id}/${action.id}`
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

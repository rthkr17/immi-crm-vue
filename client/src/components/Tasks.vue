<template>
  <div>
    <v-card height="100%" class="white elevation-2">
      <v-card-title flat class="white headline font-weight-light">
        Tasks
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="taskDialog = true">Create</v-btn>
        <v-dialog v-model="taskDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="display-1 font-weight-light">Create Task</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="regarding" label="Regarding" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-autocomplete
                      v-model="applicant"
                      :items="applicants"
                      label="Concerned Applicant"
                      required
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-autocomplete
                      v-model="assignto"
                      :items="contactList"
                      label="Assign to"
                      required
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="subject" label="Subject" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea v-model="message" label="Type a message.." required></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="taskDialog = false">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="addTask(), taskDialog = false">Send</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-tabs
        show-arrows
        class="secondary--text"
      >
        <v-tabs-slider color="primary"></v-tabs-slider>

        <v-tab
          :href="'#tab-1'"
        >
          Assigned to Me
        </v-tab>
        <v-tab
          :href="'#tab-2'"
        >
          Tasks I've Assigned
        </v-tab>
        <v-tabs-items>
          <v-tab-item
            :value="'tab-1'"
          >
            <v-data-table
              :headers="headers"
              :items="myTasks"
              class="elevation-0"
            >
              <template v-slot:items="props">
                <td>{{ props.item.id }}</td>
                <td class="justify-center">{{ props.item.regarding }}</td>
                <td class="justify-center">{{ props.item.applicant }}</td>
                <td class="justify-center">{{ props.item.subject }}</td>
                <td class="justify-center" >{{ props.item.createdAt }}</td>
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
                <v-card color="secondary--text elevation-0 title ma-5 font-weight-light" style="background:rgba(0,0,0,0)">No Tasks Yet</v-card>
              </template>
            </v-data-table>
          </v-tab-item>
          <v-tab-item
            :value="'tab-2'"
          >
            <v-data-table
              :headers="headers"
              :items="tasks"
              class="elevation-0"
            >
              <template v-slot:items="props">
                <td>{{ props.item.id }}</td>
                <td class="justify-center">{{ props.item.regarding }}</td>
                <td class="justify-center">{{ props.item.applicant }}</td>
                <td class="justify-center">{{ props.item.subject }}</td>
                <td class="justify-center" >{{ props.item.createdAt }}</td>
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
                <v-card color="secondary--text elevation-0 title ma-5 font-weight-light" style="background:rgba(0,0,0,0)">No Tasks Yet</v-card>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import TaskService from '@/services/TaskService'
import ApplicationsService from '@/services/ApplicationsService'
import StaffService from '@/services/StaffService'
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
        { text: 'ID', value: 'id' },
        { text: 'Regarding', value: 'regarding' },
        { text: 'Applicant', value: 'applicant' },
        { text: 'Subject', value: 'subject' },
        { text: 'Date', value: 'createdAt' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      tasks: [],
      myTasks: [],
      yourTasks: [],
      applications: [],
      applicants: [],
      staff: [],
      staffList: [],
      contactList: []
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

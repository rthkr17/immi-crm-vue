<template>
  <v-card height="100%" class="white elevation-2 h-100">
    <v-card-title flat class="white headline font-weight-light">
      Applications
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" @click="navigateTo('/applications')">More</v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="applications"
      class="elevation-0"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td @click="showHistory(props.item)" class="font-weight-bold"><span class="link primary--text">{{ props.item.name }}</span>
          <div class="text-xs-center">
            <v-dialog
              v-model="activityDialog"
              width="500"
            >
              <v-card>
                <v-card-title
                  class="headline primary secondary--text"
                  primary-title
                >
                  Activity History for {{ props.item.name }}
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
          </div>
        </td>
        <td>{{ props.item.status }}</td>
        <td class="justify-center font-weight-bold">{{ props.item.lifespan }}</td>
        <td class="updatedDate justify-center" >{{ props.item.updatedAt }}</td>
      </template>
      <template v-slot:no-data>
        <v-card color="secondary--text elevation-0 title ma-5 font-weight-light" style="background:rgba(0,0,0,0)">No Applications Yet</v-card>
      </template>
    </v-data-table>
  </v-card>
</template>
<!--
<template>
  <v-card height="100%" class="white elevation-2">
    <v-card-title flat class="white headline">
      Applications
      <v-spacer></v-spacer>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
      </template>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.id" label="ID"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.type" label="Type"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.documents" label="Documents"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
      <v-data-table
        v-for="application in applications"
        :key="application.id">
        <td>{{ application.name }}</td>
        <td class="justify-center">{{ application.type }}</td>
        <td class="justify-center">{{ application.status }}</td>
        <td class="justify-center">
          <v-icon
          >
            folder
          </v-icon>
        </td>
        <td class="justify-center">{{ application.lifespan }}</td>
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
                    @click="setAction(application.id, action)"
                    style="cursor: pointer"
                  >
                    {{ action.text }}
                  </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </td>
      </v-data-table>
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
  </v-card>
</template>
-->

<script>
import ApplicationsService from '@/services/ApplicationsService'
let moment = require('moment')
export default {
  data: () => ({
    activityDialog: false,
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Name', value: 'name' },
      { text: 'Status', value: 'status' },
      { text: 'Days', value: 'lifespan' },
      { text: 'Updated', value: 'updatedAt' }
    ],
    applications: []
  }),
  async mounted () {
    this.applications = (await ApplicationsService.index()).data
    for (const key in this.applications) {
      let application = this.applications[key]
      var a = moment(application.createdAt)
      var b = moment()
      application.lifespan = b.diff(a, 'days')
      application.updatedAt = moment(application.updatedAt).format('MMM Do YY')
    }
    // let myApplications = this.applications
    // console.log(myApplications)
    // Object.keys(myApplications).forEach(key => {
    //   let application = myApplications[key]
    //   Object.keys(application).forEach(keyy => {
    //     console.log(keyy)
    //     if (keyy === 'createdAt') {
    //       console.log(keyy, 'found')
    //       application[keyy].moment().format('MMM Do YY')
    //       console.log(application[keyy], 'heheh')
    //     } else if (keyy === 'updatedAt') {
    //       console.log(keyy, 'foundd')
    //       application[keyy].moment().format('MMM Do YY')
    //       console.log(application[keyy], 'huihui')
    //     } else {
    //       console.log('Couldnt find')
    //     }
    //   })
    // })
  },
  props: {
    source: String
  },
  methods: {
    async setAction (id, action) {
      if (action) {
        console.log(id)
        let url = `applications/${id}/${action.id}`
        this.$router.push(url)
      }
      // try {
      //   await ApplicationsService.setAction({
      //     id: this.action.id,
      //     text: this.action.text
      //   })
      // } catch (err) {
      //   console.log('this the error', err)
      // }
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
<style>
.link {
   cursor: pointer;
}
</style>

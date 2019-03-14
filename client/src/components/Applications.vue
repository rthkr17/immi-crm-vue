<template>
  <v-card height="100%" class="white elevation-2">
    <v-card-title flat class="white headline">
      Applications
      <v-spacer></v-spacer>
      <v-btn
        icon
        color="accent"
        dark class="mb-2"
      >
        <v-icon>search</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-layout wrap>
                <v-flex>
                  <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="editedItem.type" label="Type"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="editedItem.documents" label="Documents"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="editedItem.lifespan" label="Lifespan (Days)"></v-text-field>
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
      :headers="headers"
      :items="applications"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="justify-center">{{ props.item.type }}</td>
        <td class="justify-center">{{ props.item.status }}</td>
        <td class="justify-center">
          <v-icon
            @click="showDocs(props.item.documents)"
          >
            folder
          </v-icon>
        </td>
        <td class="justify-center">{{ props.item.lifespan }}</td>
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
                    @click="action(props.item, index)"
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
</template>

<script>
export default {
  data: () => ({
    actions: [
      {
        text: 'Create Note',
        id: 'cn'
      },
      {
        text: 'Family Member',
        id: 'cfm'
      },
      {
        text: 'Edit',
        id: 'edit'
      },
      {
        text: 'Validate',
        id: 'validate'
      },
      {
        text: 'Assign',
        id: 'assign'
      },
      {
        text: 'Send Email',
        id: 'send'
      },
      {
        text: 'Forms',
        id: 'forms'
      },
      {
        text: 'Submission',
        id: 'submit'
      }
    ],

    dialog: false,
    headers: [
      {
        text: 'Applicant Name',
        align: 'left',
        value: 'name'
      },
      { text: 'Type', value: 'type' },
      { text: 'Status', value: 'status' },
      { text: 'Documents', value: 'documents' },
      { text: 'Lifespan', value: 'lifespan' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    applications: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      type: '',
      status: '',
      documents: '',
      lifespan: 0
    },
    defaultItem: {
      name: '',
      type: 0,
      status: 0,
      documents: 0,
      lifespan: 0
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.applications = [
        {
          name: 'Frozen Yogurt',
          type: 159,
          status: 6.0,
          documents: 24,
          lifespan: 4.0
        },
        {
          name: 'Ice cream sandwich',
          type: 237,
          status: 9.0,
          documents: 37,
          lifespan: 4.3
        },
        {
          name: 'Eclair',
          type: 262,
          status: 16.0,
          documents: 23,
          lifespan: 6.0
        },
        {
          name: 'Cupcake',
          type: 305,
          status: 3.7,
          documents: 67,
          lifespan: 4.3
        },
        {
          name: 'Gingerbread',
          type: 356,
          status: 16.0,
          documents: 49,
          lifespan: 3.9
        },
        {
          name: 'Jelly bean',
          type: 375,
          status: 0.0,
          documents: 94,
          lifespan: 0.0
        },
        {
          name: 'Lollipop',
          type: 392,
          status: 0.2,
          documents: 98,
          lifespan: 0
        },
        {
          name: 'Honeycomb',
          type: 408,
          status: 3.2,
          documents: 87,
          lifespan: 6.5
        },
        {
          name: 'Donut',
          type: 452,
          status: 25.0,
          documents: 51,
          lifespan: 4.9
        },
        {
          name: 'KitKat',
          type: 518,
          status: 26.0,
          documents: 65,
          lifespan: 7
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.applications.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.applications.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.applications.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.applications[this.editedIndex], this.editedItem)
      } else {
        this.applications.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

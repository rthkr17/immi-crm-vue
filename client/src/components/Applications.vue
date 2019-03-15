<template>
  <v-app>
    <!-------------------------->
    <!-------------------------->
    <v-layout row>
      <v-flex
        xs12
        sm12
        md12
        lg12
      >
        <app-list-table></app-list-table>
      </v-flex>
    </v-layout>
    <!-- <v-footer app>c - 2019</v-footer> -->
  </v-app>
</template>

<script>
import AppListTable from '@/components/AppListTable'

export default {
  components: {
    AppListTable
  },
  data: () => ({
    dialog: false,
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

  props: {
    source: String
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

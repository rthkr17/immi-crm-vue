<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1">
      Select Application Type
      <small></small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card class="vcard">
        <v-flex xs10 offset-xs1 d-flex>
        <v-select
          v-model="type"
          :items="formslist"
          label="Standard"
          required
        ></v-select>
      </v-flex>
      </v-card>
      <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" editable step="2">Tell us about yourself</v-stepper-step>

    <v-stepper-content step="2">
      <v-card class="vcard">
        <v-form v-model="valid">
          <v-container>
            <v-layout>
              <v-flex
                xs12
                md4
              >
                <v-text-field
                  v-model="firstname"
                  :counter="10"
                  label="First name"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex
                xs12
                md4
              >
                <v-text-field
                  v-model="lastname"
                  :counter="10"
                  label="Last name"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex
                xs12
                md4
              >
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex
                xs12
                md4
              >
                <v-text-field
                  v-model="dob"
                  label="Date of Birth"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md4
              >
                <v-text-field
                  v-model="pob"
                  label="Place of Birth"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md4
              >
                <v-text-field
                  v-model="cob"
                  label="Country of Birth"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md4
              >
                <v-select
                  v-model="gender"
                  :items="genderlist"
                  label="Gender"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
      <v-btn color="primary" @click="createApplication(), e6 = 3">Continue</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import ApplicationsService from '@/services/ApplicationsService'
export default {
  data: () => ({
    e6: 1,
    application: {
      type: '',
      firstname: '',
      lifespan: 0,
      lastname: '',
      documents: [],
      status: '',
      email: '',
      dob: '',
      pob: '',
      cob: '',
      gender: '',
      error: null

    },
    formslist: ['CIT 0001 - Application for a Citizenship Certificate - January 2019', 'CIT 0497 - Application for Grant of citizenship for Stateless Persons Born o a Canadian Parent - August 2018'],
    genderlist: ['Male', 'Female']
  }),
  methods: {
    async createApplication () {
      try {
        const response = await ApplicationsService.post({
          type: this.type,
          name: this.firstname + ' ' + this.lastname,
          email: this.email,
          lifespan: 0,
          status: 'Open',
          documents: ['Passport', 'DL', 'Aadhar', 'Birth Certificate', 'etc.'],
          dob: this.dob,
          pob: this.pob,
          cob: this.cob,
          gender: this.gender
        })
        console.log('Response is :', response)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vcard {
  box-shadow:0px 0px 0px #000
}
</style>

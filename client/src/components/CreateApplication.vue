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
          v-model="formtype"
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
                  :rules="nameRules"
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
                  :rules="nameRules"
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
                  :rules="emailRules"
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
                  :rules="dobRules"
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
                  :rules="pobRules"
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
                  :rules="cobRules"
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
      <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" editable step="3">Tell us about your Family</v-stepper-step>

    <v-stepper-content step="3">
      <v-card class="vcard"></v-card>
      <v-btn color="primary" @click="createApplication">Continue</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import ApplicationsService from '@/services/ApplicationsService'
export default {
  data: () => ({
    e6: 1,
    application: {
      formtype: null,
      firstname: null,
      lastname: null,
      email: null,
      dob: null,
      pob: null,
      cob: null,
      gender: null

    },
    formslist: ['CIT 0001 - Application for a Citizenship Certificate - January 2019', 'CIT 0497 - Application for Grant of citizenship for Stateless Persons Born o a Canadian Parent - August 2018'],
    genderlist: ['Male', 'Female']
  }),
  methods: {
    async createApplication (application) {
      try {
        const response = await ApplicationsService.post({
          formtype: this.formtype,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          dob: this.dob,
          pob: this.pob,
          cob: this.cob,
          gender: this.gender
        })
        console.log(response)
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

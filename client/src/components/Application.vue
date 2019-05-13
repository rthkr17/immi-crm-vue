<template>
  <div>
    <v-card height="100%" class="white elevation-2">
      <v-card-title flat class="white headline font-weight-light">
        Application - Edit
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mb-2 elevation-1" @click="update()">Save</v-btn>
      </v-card-title>
      <v-card-text>
        <v-tabs
          color="yellow"
          show-arrows
          class="secondary--text"
        >
          <v-tabs-slider color="primary"></v-tabs-slider>

          <v-tab
            :href="'#tab-1'"
          >
            Personal Info
          </v-tab>
          <v-tab
            :href="'#tab-2'"
          >
            Education
          </v-tab>
          <v-tab
            :href="'#tab-3'"
          >
            Family Members
          </v-tab>
          <v-tabs-items>
            <v-tab-item
              :value="'tab-1'"
            >
              <v-card flat>
                <v-card-text>
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
                      <v-text-field
                        v-model="gender"
                        :items="genderlist"
                        label="Gender"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item
              :value="'tab-2'"
            >
              <v-card flat>
                <v-card-text>{{ 21356745675647123 }}</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item
              :value="'tab-3'"
            >
              <v-card flat>
                <v-card-text>{{ 654645645 }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ApplicationsService from '@/services/ApplicationsService'
export default {
  data () {
    return {
      formtype: '',
      name: '',
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
      error: null,
      application: {}
    }
  },
  async mounted () {
    const applicationId = this.$store.state.route.params.applicationId
    this.application = (await ApplicationsService.show(applicationId)).data
    this.firstname = this.application.firstname
    this.lastname = this.application.lastname
    this.email = this.application.email
    this.dob = this.application.dob
    this.pob = this.application.pob
    this.cob = this.application.cob
    this.gender = this.application.gender
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-text-field {
  padding:4%;
}
</style>

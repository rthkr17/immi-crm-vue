<template>
  <div>
    <v-card height="100%" class="white elevation-2">
      <v-card-title flat class="white headline font-weight-light">
        User Profile
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="navigateTo('/applications')">Save</v-btn>
      </v-card-title>
      <v-card-text>
        <v-layout>
          <v-flex
            xs12
            md4
            class="personalInfo"
          >
            <div class="font-weight-light title secondary--text pa-2">Personal Info</div>
            <v-text-field
              v-model="firstname"
              :counter="10"
              label="First name"
              required
            ></v-text-field>
            <v-text-field
              v-model="lastname"
              :counter="10"
              label="Last name"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="E-mail"
              required
              disabled
            ></v-text-field>
            <v-text-field
              v-model="phone"
              label="Phone"
              required
            ></v-text-field>
            <v-autocomplete
              v-model="timezone"
              :items="timezones"
              label="Select Time Zone"
              required
            ></v-autocomplete>
          </v-flex>
          <v-flex
            xs12
            md8
            class="availabilityInfo"
          >
            <div class="font-weight-light title primary--text pa-2">Availabilty (Starting Time)</div>
            <v-layout row wrap>
              <v-flex
                xs12
                sm4
              >
                <v-dialog
                  ref="mondayDialog"
                  v-model="mondayModal"
                  :return-value.sync="mondayTime"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="mondayTime"
                      label="Monday"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker v-model="mondayTime" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="mondayModal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.mondayDialog.save(mondayTime), mondayModal = false">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex
                xs12
                sm4
              >
                <v-dialog
                  ref="tuesdayDialog"
                  v-model="tuesdayModal"
                  :return-value.sync="tuesdayTime"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="tuesdayTime"
                      label="Tuesday"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker v-model="tuesdayTime" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="tuesdayModal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.tuesdayDialog.save(tuesdayTime), tuesdayModal = false">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex
                xs12
                sm4
              >
                <v-dialog
                  ref="wednesdayDialog"
                  v-model="wednesdayModal"
                  :return-value.sync="wednesdayTime"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="wednesdayTime"
                      label="Wednesday"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker v-model="wednesdayTime" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="wednesdayModal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.wednesdayDialog.save(wednesdayTime), wednesdayModal = false">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex
                xs12
                sm4
              >
                <v-dialog
                  ref="thursdayDialog"
                  v-model="thursdayModal"
                  :return-value.sync="thursdayTime"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="thursdayTime"
                      label="Thursday"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker v-model="thursdayTime" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="thursdayModal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.thursdayDialog.save(thursdayTime), thursdayModal = false">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex
                xs12
                sm4
              >
                <v-dialog
                  ref="fridayDialog"
                  v-model="fridayModal"
                  :return-value.sync="fridayTime"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="fridayTime"
                      label="Friday"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker v-model="fridayTime" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="fridayModal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.fridayDialog.save(fridayTime), fridayModal = false">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex
                xs12
                sm4
              >
                <v-dialog
                  ref="saturdayDialog"
                  v-model="saturdayModal"
                  :return-value.sync="saturdayTime"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="saturdayTime"
                      label="Saturday"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker v-model="saturdayTime" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="saturdayModal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.saturdayDialog.save(saturdayTime), saturdayModal = false">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex
                xs12
                sm4
              >
                <v-dialog
                  ref="sundayDialog"
                  v-model="sundayModal"
                  :return-value.sync="sundayTime"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="sundayTime"
                      label="Sunday"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker v-model="sundayTime" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="sundayModal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.sundayDialog.save(sundayTime), sundayModal = false">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import UserProfileService from '@/services/UserProfileService'
export default {
  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      timezone: '',
      availability: [],
      phone: null,
      error: null,
      nameaftersplit: '',
      userprofile: [],
      mondayModal: false,
      mondayTime: '',
      mondayDialog: false,
      tuesdayModal: false,
      tuesdayTime: '',
      tuesdayDialog: false,
      wednesdayModal: false,
      wednesdayTime: '',
      wednesdayDialog: false,
      thursdayModal: false,
      thursdayTime: '',
      thursdayDialog: false,
      fridayModal: false,
      fridayTime: '',
      fridayDialog: false,
      saturdayModal: false,
      saturdayTime: '',
      saturdayDialog: false,
      sundayModal: false,
      sundayTime: '',
      sundayDialog: false
    }
  },
  async mounted () {
    this.nameaftersplit = this.$store.state.user.name.split(' ')
    this.firstname = this.nameaftersplit[0]
    this.lastname = this.nameaftersplit[1]
    this.email = this.$store.state.user.email
  },
  props: {
    source: String
  },
  methods: {
    async saveProfile () {
      try {
        const response = await UserProfileService.addProfile({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          timezone: this.timezone,
          phone: this.phone || ''
        })
        console.log(response)
        this.userprofile = (await UserProfileService.getProfile()).data
      } catch (error) {
        this.error = error.response.data.error
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
.personalInfo {
  background-color:#E9FaF7;
}
.availabilityInfo {
  background-color:#faFfFb;
}
</style>

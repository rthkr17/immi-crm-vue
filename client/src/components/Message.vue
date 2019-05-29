<template>
  <div>
    <v-card model="message" height="100%" class="white elevation-2">
      <v-card-title flat class="white headline font-weight-light">
        Message - View
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
            Chat
          </v-tab>
          <v-tab
            :href="'#tab-2'"
          >
            Media
          </v-tab>
          <v-tab
            :href="'#tab-3'"
          >
            Settings
          </v-tab>
          <v-tabs-items>
            <v-tab-item
              :value="'tab-1'"
            >
              <v-card flat v-for="item in message" :key="item">
                <v-card-text>
                  <v-layout>
                    <v-flex
                      xs12
                      md4
                    >
                      <v-text-field
                        v-model="from"
                        :counter="10"
                        label="From"
                        disabled
                        required
                      >{{ item }}</v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      md4
                    >
                      <v-text-field
                        v-model="to"
                        :counter="10"
                        label="To"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-text-field
                        v-model="subject"
                        label="Subject"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex
                      xs12
                      md4
                    >
                      <v-textarea
                        v-model="content"
                        label="Content"
                        required
                      ></v-textarea>
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
import MessageService from '@/services/MessageService'
export default {
  data () {
    return {
      from: '',
      to: '',
      applicant: '',
      subject: '',
      content: '',
      error: null,
      message: []
    }
  },
  async mounted () {
    const messageId = this.$store.state.route.params.messageId
    this.message = (await MessageService.show(messageId)).data
    this.from = this.message.from
    this.to = this.message.to
    this.applicant = this.message.applicant
    this.subject = this.message.subject
    this.content = this.message.content
    console.log('Message object is :', this.message)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-text-field {
  padding:4%;
}
</style>

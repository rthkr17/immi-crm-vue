<template>
  <v-card height="100%" class="white elevation-2">
    <v-card-title flat class="white headline font-weight-light">
    Calender
      <v-spacer></v-spacer>
      <v-btn icon color="primary" dark class="mb-2" v-on="on">
        <v-icon>add</v-icon>
      </v-btn>
    </v-card-title>
    <v-sheet class="px-2" height="400">
      <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
      <v-calendar
        ref="calendar"
        :now="today"
        :value="today"
        color="primary"
        type="week"
      >
        <!-- the events at the top (all-day) -->
        <template v-slot:dayHeadere="{ date }">
          <template v-for="event in eventsMap[date]">
            <!-- all day events don't have time -->
            <div
              v-if="!event.time"
              :key="event.title"
              class="my-event"
              @click="open(event)"
              v-html="event.title"
            ></div>
          </template>
        </template>
        <!-- the events at the bottom (timed) -->
        <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
          <template v-for="event in eventsMap[date]">
            <!-- timed events -->
            <div
              v-if="event.time"
              :key="event.title"
              :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
              class="my-event with-time"
              @click="open(event)"
              v-html="event.title"
            ></div>
          </template>
        </template>
      </v-calendar>
    </v-sheet>
  </v-card>
</template>

<script>
import SchedulesService from '@/services/SchedulesService'
let moment = require('moment')
export default {
  data: () => ({
    today: '',
    events: [
      {
        title: 'Staff Meeting',
        date: '2019-05-13',
        time: '09:00',
        duration: 60
      },
      {
        title: 'Meeting with John Wick',
        date: '2019-05-14',
        time: '11:00',
        duration: 30
      },
      {
        title: 'Meeting with Akshit Rana',
        date: '2019-05-17',
        time: '12:30',
        duration: 60
      }
    ]
  }),
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap () {
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    }
  },
  async mounted () {
    this.today = moment().format('mm ss')
    this.$refs.calendar.scrollToTime(this.today)
    this.events.append((await SchedulesService.getSchedules()).data)
    console.log('events : ', this.events)
  },
  methods: {
    open (schedule) {
      alert(schedule.title)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #009688;
    color: #ffffff;
    border: 1px solid #009688;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;

    &.with-time {
      position: absolute;
      right: 4px;
      margin-right: 0px;
    }
  }
</style>

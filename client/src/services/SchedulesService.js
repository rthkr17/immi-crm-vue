import Api from '@/services/Api'

export default {
  getSchedules () {
    return Api().get('schedules')
  },
  addSchedule (schedule) {
    return Api().post('schedules', schedule)
  }
}

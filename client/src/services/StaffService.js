import Api from '@/services/Api'

export default {
  getStaff () {
    return Api().get('staff')
  },
  addStaff (staff) {
    return Api().post('staff', staff)
  }
}

import Api from '@/services/Api'

export default {
  index () {
    return Api().get('applications')
  },
  post (application) {
    return Api().post('applications', application)
  }
}

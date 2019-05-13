import Api from '@/services/Api'

export default {
  index () {
    return Api().get('applications')
  },
  show (applicationId) {
    return Api().get(`applications/${applicationId}`, applicationId)
  },
  post (application) {
    return Api().post('applications', application)
  }
}

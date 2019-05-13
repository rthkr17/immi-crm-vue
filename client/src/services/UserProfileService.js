import Api from '@/services/Api'

export default {
  getProfile () {
    return Api().get('profile')
  },
  saveProfile (profile) {
    return Api().post('profile', profile)
  }
}

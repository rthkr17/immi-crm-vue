import Api from '@/services/Api'

export default {
  getRetainers () {
    return Api().get('retainers')
  },
  addRetainer (retainer) {
    return Api().post('retainers', retainer)
  }
}

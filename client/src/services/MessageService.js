import Api from '@/services/Api'

export default {
  getMessages () {
    return Api().get('messages')
  },
  addMessage (message) {
    return Api().post('messages', message)
  }
}

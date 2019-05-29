import Api from '@/services/Api'

export default {
  getMessages () {
    return Api().get('messages')
  },
  show (messageId) {
    return Api().get(`messages/${messageId}`, messageId)
  },
  addMessage (message) {
    return Api().post('messages', message)
  }
}

import Api from '@/services/Api'

export default {
  getTasks () {
    return Api().get('tasks')
  },
  addTask (task) {
    return Api().post('tasks', task)
  }
}

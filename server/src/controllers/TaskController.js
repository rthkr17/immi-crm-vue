const {Task} = require('../models')

module.exports = {
  async getTasks (req, res) {
    try {
      const task =  await Task.findAll({
      })
      res.send(task)
    } catch (err) {
      res.status(400).send({
        error: 'Error fetching Tasks.'
      })
    }
  },
  async addTask (req, res) {
    try {
      const task = await Task.create(req.body)
      res.send(task)
    } catch (err) {
      res.status(400).send({
        error: 'Error adding message.'
      })
    }
  }
}
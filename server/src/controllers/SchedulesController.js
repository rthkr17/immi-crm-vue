const {Schedule} = require('../models')

module.exports = {
  async getSchedules (req, res) {
    try {
      const schedules =  await Schedule.findAll({
        limit:20
      })
      res.send(schedules)
    } catch (err) {
      res.status(400).send({
        error: 'Error fetching schedules.'
      })
    }
  },
  async addSchedule (req, res) {
    try {
      const schedule = await Schedule.create(req.body)
      res.send(schedule)
    } catch (err) {
      res.status(400).send({
        error: 'Error posting schedule.'
      })
    }
  }
}
const {Staff} = require('../models')

module.exports = {
  async getStaff (req, res) {
    try {
      const staff =  await Staff.findAll({
      })
      res.send(staff)
    } catch (err) {
      res.status(400).send({
        error: 'Error fetching Staff.'
      })
    }
  },
  async addStaff (req, res) {
    try {
      const staff = await Staff.create(req.body)
      const staffJson = staff.toJSON()
      res.send({
        staff: staffJson
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  }
}
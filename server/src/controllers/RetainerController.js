const {Retainer} = require('../models')

module.exports = {
  async getRetainers (req, res) {
    try {
      const retainers =  await Retainer.findAll({
        limit:20
      })
      res.send(retainers)
    } catch (err) {
      res.status(400).send({
        error: 'Error fetching retainers.'
      })
    }
  },
  async addRetainer (req, res) {
    try {
      const retainer = await Retainer.create(req.body)
      res.send(retainer)
    } catch (err) {
      res.status(400).send({
        error: 'Error posting application.'
      })
    }
  }
}
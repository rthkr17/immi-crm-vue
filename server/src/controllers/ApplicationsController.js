const {Application} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const applications =  await Application.findAll({
        limit:20
      })
      res.send(applications)
    } catch (err) {
      res.status(400).send({
        error: 'Error fetching applications.'
      })
    }
  },
  async show (req, res) {
    try {
      const application =  await Application.findById(req.params.applicationId)
      res.send(application)
    } catch (err) {
      res.status(400).send({
        error: 'Error fetching application.'
      })
    }
  },
  async post (req, res) {
    try {
      const application = await Application.create(req.body)
      res.send(application)
    } catch (err) {
      res.status(400).send({
        error: 'Error posting application.'
      })
    }
  }
}
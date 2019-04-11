const {Message} = require('../models')

module.exports = {
  async getMessages (req, res) {
    try {
      const message =  await Message.findAll({
      })
      res.send(message)
    } catch (err) {
      res.status(400).send({
        error: 'Error fetching Messages.'
      })
    }
  },
  async addMessage (req, res) {
    try {
      const message = await Message.create(req.body)
      const messageJson = message.toJSON()
      res.send({
        message: messageJson
      })
    } catch (err) {
      res.status(400).send({
        error: 'Error adding message.'
      })
    }
  }
}
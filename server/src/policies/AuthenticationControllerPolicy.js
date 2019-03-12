const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,72}$')
            )
        }

        const {error} = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email': {
                    res.status(400).send({
                        error: 'You must provide a valid email address.'
                    })
                    break
                }
                case 'password': {
                    res.status(400).send({
                        error: `The password provided did not match our rules : 
                        <br>
                        1. Must contain only these caharcters - uppercase, lowercase or numbers.
                        <br>
                        2. Must be 8 to 32 characters long.
                        `
                    })
                    break
                }
                default : {
                    res.status(400).send({
                        error: 'Invalid registration info.'
                    })
                }
            }
        }
        else {
            next()
        }
    }
}
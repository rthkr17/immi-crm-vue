
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/status', (req,res) => {
    res.send({
        message : `Hi! backend is live.`
    })
})

app.post('/register', (req,res) => {
    res.send({
        message : `Hi ${req.body.email}! Your password is ${req.body.password}. You are now registered.`
    })
})

app.listen(process.env.PORT || 8081)

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const mailjet = require('node-mailjet').connect('5df205f1dcc3ded4f48ed2a3dbc2e15a', '0cf3a41bc71c7d3c2e657bde4080f0ea')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes/index')
const handlingError = require('./middlewares/handlingError')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', routes)
app.use(handlingError)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
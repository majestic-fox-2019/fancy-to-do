if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3000
const main = require('./routes')
const errorHandling = require('./middleware/errorHandling')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', main)
app.use(errorHandling)

app.listen(PORT, () => {
    console.log(`Listening to the port : ${PORT}`)
})
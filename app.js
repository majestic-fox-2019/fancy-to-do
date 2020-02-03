const express = require('express')
const app = express()
const PORT = 3000
const main = require('./routes')
const errorHandling = require('./middleware/errorHandling')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', main)

// taruh di middlewares
app.use(errorHandling)

app.listen(PORT, () => {
    console.log(`Listening to the port : ${PORT}`)
})
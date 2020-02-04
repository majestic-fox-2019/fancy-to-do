'use strict'

require('dotenv').config()
const express = require('express')
const app = express()
const route = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', route)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`app listen on port ${port}`)
})
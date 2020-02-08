'use strict'

require('dotenv').config()
const express = require('express')
const app = express()
const route = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', route)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`app listen on port ${port}`)
})
"use strict"

require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
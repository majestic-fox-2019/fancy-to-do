"use strict"

require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT

routes.use(express.json()) // for parsing application/json
routes.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
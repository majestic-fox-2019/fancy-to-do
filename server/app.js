if (
  process.env.NODE_ENV == 'development' ||
  process.env.NODE_ENV == 'production'
) {
  require('dotenv').config()
}
require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const PORT = process.env.PORT
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)
app.use(errorHandler)

http.listen(PORT, function() {
  console.log('app listening on port', PORT)
})

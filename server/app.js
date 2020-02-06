if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes/index')
const error = require('./middleware/error')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.use(error)

app.listen(port, () => console.log(`Server listening on port ${port}!`))

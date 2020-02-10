if (process.env.NODE_ENV === "development") {
  require('dotenv').config()
}


const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index')
const erroHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

app.use(erroHandler)


app.listen(port, () => console.log(`server running ${port}`))



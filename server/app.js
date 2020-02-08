const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const IndexRoute = require('./routes/indexRoute')
const errorHandler = require("./middlewares/errorHandler")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', IndexRoute)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const IndexRoute = require('./routes/indexRoute')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', IndexRoute)

app.use((err, req, res, next) => {
  if (err.status){
    res.status(err.status).json(err.message) 
  } else {
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
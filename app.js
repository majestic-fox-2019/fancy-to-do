const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const TaskRoute = require('./routes/taskRoute')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/todos', TaskRoute)

app.use((err, req, res, next) => {
  if (err.statusCode){
    res.status(err.statusCode).json(err.message) 
  } else {
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
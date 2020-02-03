const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.use(function (err, req, res, next) {
  if (err.StatusCode) {
    res.status(err.StatusCode).json({
      message: err.message
    })
  } else {
    res.status(500).send('Something broke!')
  }
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))

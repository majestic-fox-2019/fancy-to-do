const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', routes)

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).json({
      message: err.message
    })
  } else {
    res.statusCode(500).send('Internal Sever Error')
  }
})

app.listen(port, () => console.log(`server running ${port}`))
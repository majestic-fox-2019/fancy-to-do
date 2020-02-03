const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use('/', router)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: 'Error Not Found'
  })
})

app.listen(PORT, () => {
  console.log(`Server running is port ${PORT}`)
})
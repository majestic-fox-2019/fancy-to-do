const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index')
const error = require('./middleware/error')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.use(error)

app.listen(port, () => console.log(`Server listening on port ${port}!`))

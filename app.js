const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes/index')
const handlingError = require('./middlewares/handlingError')

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use('/', routes)

app.use(handlingError)
    

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
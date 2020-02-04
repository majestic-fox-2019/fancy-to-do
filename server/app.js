if (process.env.NODE_ENV==='development') {
    require('dotenv').config()    
}
const express = require('express')
const app = express()
const port = 3000
var routes = require('./routes/routesTodos')
const userRoutes = require('./routes/routesUser')
const error_handlers = require('./middleware/error_handlers')
const authenticated = require("./middleware/authentication")

// require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', userRoutes)
app.use(authenticated)
app.use('/todos', routes)


app.use(error_handlers.showError)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
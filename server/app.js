const express = require('express')
const app = express()
const port = 3000
var routes = require('./routes/routesTodos')
const bcrypt = require('bcrypt');
const userRoutes = require('./routes/routesUser')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/todos', routes)
app.use('/users', userRoutes)


const error_handlers = require('./error_handling/error_handlers')
app.use(error_handlers.showError)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
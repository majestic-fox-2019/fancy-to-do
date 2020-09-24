if( process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}
const cors = require('cors')

const express = require('express')
const app = express()
const port = 3000

const authentication = require('./middleware/authentication')
const errorhandling = require('./middleware/errorhandling')
const allerror = require('./helper/allerror')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// user login 
const user = require('./routes/routeUser')
app.use('/', user)


app.use(authentication)


// user crud todo
const todo = require('./routes/routeTodo')
app.use('/todos', todo)


app.use(errorhandling)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
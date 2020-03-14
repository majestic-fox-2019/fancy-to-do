if(process.env.NODE_ENV == 'development'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')

const route = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended:true } ))

app.use(route)
app.use(errorHandler.clientErrorHandler)
app.use(errorHandler.serverErrorHandler)

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})

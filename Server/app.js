if(process.env.NODE_ENV == "development"){
    require('dotenv').config()
}


const express = require('express')
const index = require('./Routes/index')
const errorHandling = require('./middleware/errorHandling')
const app = express()
var cors = require('cors')
const PORT = 3000
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/',index)
app.use(errorHandling)

app.listen(PORT,()=>{
    console.log(`Listening on port : ${PORT}`)
})
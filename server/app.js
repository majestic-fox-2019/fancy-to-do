if(process.env.NODE_ENV == 'development'){
  // console.log(process.env.NODE_ENV);
  require('dotenv').config()
}
const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000
const route = require('./routes/routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',route)

const errorHandler = require('./error_handling/error_handler')
app.use(errorHandler)

app.listen(3000,()=>{
  console.log(`Connected to port: ${port}`)
})
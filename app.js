if( process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = 3000

const authentication = require('./middleware/authentication')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const user = require('./routes/routeUser')
app.use('/', user)

app.use(authentication)

const todo = require('./routes/routeTodo')
app.use('/todos', todo)


const allerror =require('./helper/allerror')

app.use((err,req,res,next)=>{
  console.log(err)
  if(err.statusCode){
    if(typeof err.data == 'string'){
      res.status(err.statusCode).json(err.data)
    }else{
      let dataError = allerror(err.data)
      res.status(err.statusCode).json(dataError)
    }
  }else{
     res.sendStatus(500)
   }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
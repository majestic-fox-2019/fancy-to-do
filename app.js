
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const routes = require('./routes/index')
app.use('/', routes)

const allerror =require('./helper/allerror')

app.use((err,req,res,next)=>{
  
  if(err.statusCode){
    let dataError = allerror(err.data)
  res.status(err.statusCode).json(dataError)
  }else{
     res.sendStatus(500)
   }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
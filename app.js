const express = require('express')
const index = require('./Routes/index')
const app = express()
const PORT = 3000
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/',index)
app.use(function (err, req, res, next) {
    if(err.StatusCode){
        res.status(err.StatusCode).json({
            message:err.message
        })
        // console.log(err.message)
    }
    else{
        res.status(500).send('server is error')
    }
  })

app.listen(PORT,()=>{
    console.log(`Listening on port : ${PORT}`)
})
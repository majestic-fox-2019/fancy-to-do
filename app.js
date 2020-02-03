const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const routes = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use('/', routes)

app.use((err, req, res, next) => {
    if(err.statusCode){
        res.status(err.statusCode).json(err.data)
    }else{
        res.sendStatus(500)
    }
})
    

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
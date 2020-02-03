const express = require("express")
const app = express()
const port = 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes)
app.use(errorHandler.client)
app.use(errorHandler.server)

app.listen(port,() => {
  console.log(`server listen to port ${port}`)
})
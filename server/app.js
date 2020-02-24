if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const express = require("express");
var cors = require('cors')
const app = express();
const port = 3000;
const routes = require("./routes");
const errorHandling = require('./middlewares/errorHandling')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/', routes)
app.use(errorHandling)


app.listen(port, () => console.log(`App listening on port ${port}!`))
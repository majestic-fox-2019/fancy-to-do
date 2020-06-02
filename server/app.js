if (!process.env.NODE_ENV || process.env.NODE_ENV == "development") {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorhandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`listening to PORT ${PORT}`)
})

//client id
// 854830452018-79b8l961htert9hsepm4lvhn4tlj8ahn.apps.googleusercontent.com

//client secret
//oD4G4oLnDifjl-3j-ZixEHaV
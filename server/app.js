"use strict"

if (process.env.NODE_ENV === "development") {
    require("dotenv").config()
}
const express = require("express")
const app = express()
const routes = require("./routes")
const cors = require("cors")
const errorHandler = require("./middleware/errorHandler")
const PORT = process.env.PORT || 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors())
app.use("/", routes)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
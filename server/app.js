const express = require('express');
const app = express()
const PORT = 3000
const Index = require('./routes/index');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

app.use('/',Index)

app.use(errorHandler)

app.listen(PORT, ()=>{console.log('app listenting on port '+PORT)})
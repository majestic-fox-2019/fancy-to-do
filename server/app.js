'use strict';

const todos             = require('./routes/todos');
const users             = require('./routes/users');

const express           = require('express');
const basicError        = require('./middlewares/error_handling');
const authenticated     = require('./middlewares/authentication');
const authorization     = require('./middlewares/authorization');

const UserController    = require('./controllers/UserController');


const app               = express();
const dotenv            = require('dotenv');
const cors              = require('cors');



dotenv.config();

const port      = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.post('/users/register', UserController.register);
app.post('/users/login', UserController.login);


// Middleware authentication
app.use(authenticated);
// app.use(authorization);

// Routes
app.use('/todos', todos);
app.use('/users', users);


// Middleware Error Handling
app.use(basicError)

app.listen(port, () => console.log(`App listening on port ${port}!`))
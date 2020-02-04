'use strict';

const todos         = require('./routes/todos');
const users         = require('./routes/users');

const express       = require('express');
const basicError    = require('./middlewares/basic_error');
const authenticated = require('./middlewares/authentication');

const app       = express();
const port      = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Middleware authentication
app.use(authenticated);

// Routes
app.use('/todos', todos);
app.use('/users', users);


// Middleware Error Handling
app.use(basicError)

app.listen(port, () => console.log(`App listening on port ${port}!`))
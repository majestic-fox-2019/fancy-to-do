'use strict';

const todos     = require('./routes/todos');

const express   = require('express');
const app       = express();
const port      = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/todos', todos);

// Error Handling
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
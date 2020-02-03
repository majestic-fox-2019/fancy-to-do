const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/', routes)
app.use((err, req, res, next) =>{
    if(err.name === 'not found'){
        res.status(404).json({message: 'Error Not Found'})
    }
    else if(err.name === 'SequelizeValidationError'){
        res.status(400).json(err.errors)
    }
    else{
        res.status(500).json({message: 'Internal server error'})
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
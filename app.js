const express = require('express');
const app = express();
const port = 4000;
const Router = require("./routes/index");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",Router);

app.use(function (err, req, res, next) {
    if(err.statusError){
        res.status(err.statusError).json(err)
    }   
    res.status(500).send('Something broke!')
  })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
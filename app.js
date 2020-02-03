const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");

// app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/', routes)
// app.use()

app.listen(port, () => console.log(`App listening on port ${port}!`))
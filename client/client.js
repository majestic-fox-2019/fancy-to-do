const express = require('express');
const app     = express();
const path    = require('path');


const dotenv  = require('dotenv');
dotenv.config();


app.use('/scripts', express.static(`${__dirname}/node_modules/`));
app.use('/root_folder', express.static(`${__dirname}/`));

// Ketika page url berubah misal /todos dan page direfresh redirect ke index.html agar tidak error
app.use((req, res) => {
    console.log(req);
    res.sendFile(`${__dirname}/index.html`);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});
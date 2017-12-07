const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
app.use(compression());

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
});

app.listen(3000, () => {

});
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const public = path.resolve(__dirname, './public');
app.listen(port, () => console.log('listening on port ' + port + '...'));

app.use(express.static(public));

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, './index.html')));


app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, './script.js')));
app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, './words.js')));


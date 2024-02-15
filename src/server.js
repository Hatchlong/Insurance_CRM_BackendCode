'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const { db } = require('../config/db');
const http = require('http');
const path = require('path');

const onServerStart = () => {
    const message = `Server Listening On Port ${PORT}`;
    console.log(message);
};
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }, { limit: '10200kb' }));
app.use(bodyParser.json());
require('./routes')(app);

// app.use(express.static(__dirname + '/public/dist/erp-front-end-code'));
app.use(express.static(__dirname + '/uploads'));


app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

app.listen(PORT, onServerStart);

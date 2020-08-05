"use strict";
require('dotenv').config();
var express = require('express');
var cors = require('cors');
var uuid = require('uuid');
var app = express();
app.use(express.json());
app.use(cors());
app.use(require('../routes'));
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("A Node Js API is listening on port: " + port);
});

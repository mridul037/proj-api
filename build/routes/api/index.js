"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var mysql = require("mysql");
router.use('/', require('./auth'));
router.use('/home', require('./home'));
router.use('/search', require('./search'));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    connectionLimit: 10,
});
con.connect(function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connection established');
});
module.exports = router;

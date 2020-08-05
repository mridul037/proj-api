"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
router.use('/', require('./auth'));
module.exports = router;

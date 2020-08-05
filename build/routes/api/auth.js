"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var AuthService_1 = require("../../services/AuthService");
router.post('/signup', AuthService_1.AuthService.signUp);
router.post('/login', AuthService_1.AuthService.login);
module.exports = router;

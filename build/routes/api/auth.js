"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var AuthService_1 = require("../../services/AuthService");
router.post('/signup', AuthService_1.AuthService.signUp);
router.post('/login', AuthService_1.AuthService.login);
router.delete('/logout', AuthService_1.AuthService.logout);
router.post('/forgetpassword', AuthService_1.AuthService.forgotPassword);
module.exports = router;

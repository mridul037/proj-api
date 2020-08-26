"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var NavService_1 = require("../../services/NavService");
router.get('/', NavService_1.NavService.navbar);
module.exports = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var CategoryService_1 = require("../../services/CategoryService");
router.post('/', CategoryService_1.CategoryService.Category);
module.exports = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var SearchService_1 = require("../../services/SearchService");
router.get('/category', SearchService_1.SearchService.category);
router.post('/subcategory', SearchService_1.SearchService.subCategory);
module.exports = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var ListingService_1 = require("../../services/ListingService");
router.post('/', ListingService_1.ListingService.Listing);
module.exports = router;

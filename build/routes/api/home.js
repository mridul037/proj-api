"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var HomeService_1 = require("../../services/HomeService");
router.get('/banner', HomeService_1.HomeService.banner);
router.get('/feature', HomeService_1.HomeService.feature);
router.get('/username', HomeService_1.HomeService.username);
module.exports = router;

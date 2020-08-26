"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var ProfileService_1 = require("../../services/ProfileService");
router.get('/', ProfileService_1.ProfileService.getProfile);
module.exports = router;

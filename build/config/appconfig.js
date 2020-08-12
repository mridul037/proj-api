"use strict";
require('dotenv').config();
module.exports = {
    auth: {
        jwt_secret: 'f11a77fc67c119e62bc4edc9f019cf8fdf516c28d5d39edc34e489486f7f6e566d927f84367b29c6f26a9a03fc6af0216a0e12d153844758955b545ea46b1490',
        jwt_refresh: '5f18572282a44a1f88023da64294f2a86c63bdc91368ccb68d2ef1f3fd3a978bfb47bf3687ae9f37340d3590d36a6c2fddd9f897b1a2021e3450397a5999196e'
    },
    mailConfig: {
        host: 'smtp.hostinger.in',
        password: 'WadMarket@1',
        email: 'wadmarket@thecodebucket.com',
        port: '587',
    }
};

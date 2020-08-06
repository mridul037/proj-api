"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
var jwt = require('jsonwebtoken');
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.prototype.getTokenFromHeader = function (req) {
        if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token')
            || (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
            return req.headers.authorization.split(' ')[1];
        }
        return null;
    };
    return Auth;
}());
exports.Auth = Auth;

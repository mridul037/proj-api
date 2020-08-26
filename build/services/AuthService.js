"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var Joi = require("joi");
var config = require("../config/appconfig");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
//const crypto = require//('crypto');
var auth_1 = require("../utils/auth");
var users = [];
var refreshTokens = [];
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, schema, error, accessToken, refreshToken, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = users.find(function (user) { return user.email === req.body.email; });
                        if (user == null) {
                            return [2 /*return*/, res.status(400).send("user not exist")];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        schema = Joi.object({
                            email: Joi.string().required(),
                            password: Joi.string(),
                        });
                        error = schema.validate(req.body).error;
                        console.log(config);
                        return [4 /*yield*/, bcrypt.compare(req.body.password, user.password)];
                    case 2:
                        if (_a.sent()) {
                            accessToken = jwt.sign(user, config.auth.jwt_secret, {
                                expiresIn: "1hr",
                            });
                            refreshToken = jwt.sign(user, config.auth.jwt_refresh);
                            refreshTokens.push(refreshToken);
                            response = {
                                success: true,
                                data: {
                                    status: "LoggedIn",
                                    accessToken: accessToken,
                                    refreshToken: refreshToken,
                                    link: "/home",
                                },
                            };
                            res.json(response);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        res.status(500).send();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.signUp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, error, hashedPassword, user, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        schema = Joi.object({
                            name: Joi.string().required(),
                            email: Joi.string().required(),
                            password: Joi.string(),
                            mobile_no: Joi.string(),
                        });
                        error = schema.validate(req.body).error;
                        return [4 /*yield*/, bcrypt.hash(req.body.password, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        user = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hashedPassword,
                            mobile_no: req.body.mobile_no,
                        };
                        users.push(user);
                        response = {
                            success: true,
                            data: {
                                status: "SignedIn",
                                link: "/pages/login",
                            },
                        };
                        res.status(201).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(500).json();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.logout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, tokenFromHeader, user;
            return __generator(this, function (_a) {
                auth = new auth_1.Auth();
                tokenFromHeader = auth.getTokenFromHeader(req);
                user = jwt.decode(tokenFromHeader);
                refreshTokens = refreshTokens.filter(function (token) { return token !== tokenFromHeader; });
                res.sendStatus(204);
                return [2 /*return*/];
            });
        });
    };
    AuthService.users = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.send(users);
                return [2 /*return*/];
            });
        });
    };
    AuthService.forgotPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var transporter, receiver, mailObj, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        transporter = nodemailer.createTransport({
                            host: config.mailConfig.host,
                            port: config.mailConfig.port,
                            secure: false,
                            auth: {
                                user: config.mailConfig.email,
                                pass: config.mailConfig.password,
                            },
                        });
                        receiver = "" + req.body.email;
                        return [4 /*yield*/, transporter.sendMail({
                                from: "wadmarket@thecodebucket.com",
                                to: receiver,
                                subject: "Hello ✔",
                                text: "Hello world?",
                                html: "<b>Hello world?</b>",
                            })];
                    case 1:
                        mailObj = _a.sent();
                        response = {
                            success: true,
                            data: {
                                link: "/login",
                            },
                        };
                        console.log("Message sent: %s", mailObj.messageId);
                        res.json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
exports.AuthService = AuthService;

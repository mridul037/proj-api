const Joi = require("joi");
const config = require("../config/appconfig");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
//const crypto = require//('crypto');

import { Auth } from "../utils/auth";
// import {sendMail} from '../utils/mail';
import { any } from "joi";

const users: any = [];
let refreshTokens: Array<string> = [];
const {
  MAIL_HOST: host,
  MAIL_EMAIL: email,
  MAIL_PASSWORD: password,
  MAIL_PORT: port,
} = process.env;

const mailConfig = {
  host,
  email,
  password,
  port,
};

export class AuthService {
  constructor() {}

  static async login(req: any, res: any) {
    const user = users.find((user: any) => user.name === req.body.name);
    if (user == null) {
      return res.status(400).send("user not exist");
    }
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string(),
        mobile_no: Joi.string(),
      });
      const { error } = schema.validate(req.body);
      console.log(config);
      if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign(user, config.auth.jwt_secret, {
          expiresIn: "1hr",
        });

        const refreshToken = jwt.sign(user, config.auth.jwt_refresh);
        refreshTokens.push(refreshToken);
        const response = {
          success: true,
          data: {
            status: "LoggedIn",
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        };
        res.send(response);
      }

      //requestHandler.validateJoi(error,400,'bad request',error?error.details[0].message:'');
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  }

  static async signUp(req: any, res: any) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string(),
        mobile_no: Joi.string(),
      });
      const { error } = schema.validate(req.body);
      //console.log(req.body);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        mobile_no: req.body.mobile_no,
      };

      users.push(user);
      const response = {
        success: true,
        data: {
          status: "SignedIn",
          link: "/login",
        },
      };
      res.status(201).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  }

  static async logout(req: any, res: any) {
    let auth = new Auth();
    const tokenFromHeader = auth.getTokenFromHeader(req);
    const user = jwt.decode(tokenFromHeader);
    refreshTokens = refreshTokens.filter((token) => token !== tokenFromHeader);
    res.sendStatus(204);
  }

  static async users(req: any, res: any) {
    res.send(users);
  }

  static async forgotPassword(req: any, res: any) {
    try {
      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      const mailObj = await transporter.sendMail({
        from: '"Fred Foo " ,<foo@blurdybloop.com>', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      // cons = await nodemailer.createTransport(transObj);

      console.log("Message sent: %s", mailObj.messageId);
      res.send();
    } catch (err) {
      console.log(err);
    }
  }
}

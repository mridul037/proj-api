const Joi = require("joi");
const config = require('../config/appconfig');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require("bcrypt");

const users: any = [];
const refreshTokens:Array<string>=[];

export class AuthService {
  static async login(req:any, res:any) {
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
      const { error } = schema.validate(req.body)
      console.log(config);
      if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign(user, config.auth.jwt_secret, 
            { expiresIn: "1hr" }
            );
           
            const refreshToken = jwt.sign(user, config.auth.jwt_refresh);
            refreshTokens.push(refreshToken);  
            const response={
                'success':true,
                'data':{
                  'status':'LoggedIn',
                  'accessToken':accessToken,
                  'refreshToken':refreshToken
                }
              }
              res.send(response);  
      }

      //requestHandler.validateJoi(error,400,'bad request',error?error.details[0].message:'');
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  }
  static async signUp(req:any, res:any) {
    try {
     
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string(),
        mobile_no: Joi.string(),
      });
      const { error } = schema.validate(req.body)
      console.log(req.body);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        mobile_no: req.body.mobile_no,
      };


      users.push(user);
      const response={
        'success':true,
        'data':{
          'status':'SignedIn',
          'link':'/login',
         }
      }
      res.status(201).send(response);

     } catch (error) {
        console.log(error);
        res.status(500).send();
    }



  }

}

import { response } from "express";
const config = require("../config/appconfig");
const { getQuery } = require("../config/connection");
import { Auth } from "../utils/auth";
const jwt = require("jsonwebtoken");

export class ProfileService {
  constructor() {}

  static async getProfile(req: any, res: any) {
    try {
      let auth = new Auth();
     
      const tokenFromHeader = auth.getTokenFromHeader(req);
      const user = jwt.decode(tokenFromHeader);
      const response={
        success: true,
        data: {
            name:user.name,
            email:user.email,
            mobile_no:user.mobile_no
        }
      }
      res.json(response);
      console.log(user);
    } catch (Error) {
      console.log(Error);
    }
  }
}

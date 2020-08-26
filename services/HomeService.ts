import { response } from "express";

const Joi = require("joi");
const config = require("../config/appconfig");

export class HomeService {
  constructor() {}

  static async banner(req: any, res: any) {
    try {
      const banner = [
        {
          image:
            "https://ik.imagekit.io/dailyobjects/assets/images/homepage/desktop/banner/top-slider/home-office-desktop.jpg?tr=w-1280",
        },
        {
          image:
            "https://ik.imagekit.io/dailyobjects/assets/images/homepage/desktop/banner/top-slider/uv-sterilizer-desktop-02.jpg?tr=w-1280",
        },
      ];

      res.json({
        success: true,
        image: banner,
      });
    } catch (err) {
      res.status(500).send();
    }
  }
  static async feature(req: any, res: any) {
    try {
      const collections = [
        {
          image:
            "https://ik.imagekit.io/dailyobjects/assets/images/homepage/desktop/banner/homepage-mid/tote-bags-01.jpg?tr=w-700",
        },
        {
          image:
            "https://ik.imagekit.io/dailyobjects/assets/images/homepage/desktop/banner/homepage-mid/tote-bags-01.jpg?tr=w-700",
        },
      ];

      res.json({
        success: true,
        image: collections,
      });
    } catch (err) {
      res.status(500).send();
    }
  }
}

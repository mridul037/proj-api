import { response } from "express";

const { getQuery } = require("../config/connection");
const config = require("../config/appconfig");

export class CategoryService {
  constructor() {}

  static async Category(req: any, res: any) {
    try {
      if (req.body.ID !== undefined) {
        const id = req.body.ID;
        const category = await getQuery(
          "SELECT * FROM `category` WHERE Parent_category_ID=10"
        );

        res.json({
          success: true,
          data: {
            list: category,
          },
        });
      } else {
        res.json();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

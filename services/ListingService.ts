import { response } from "express";

const { getQuery } = require("../config/connection");
const config = require("../config/appconfig");

export class ListingService {
  constructor() {}
  static async Listing(req: any, res: any) {
    try {
      if (req.body.ID !== undefined) {
        const id = req.body.ID;
        const listing = await getQuery(
          "SELECT * FROM `products` WHERE Sub_Category=12"
        );
        let value: Array<Object> = [];
        let varients: Array<Object> = [];

        await Promise.all(
          listing.map(async (item: any) => {
            let obj = {};

            const description = await getQuery(
              "SELECT * FROM `product_variations` WHERE Product_ID=" + item.ID
            );
            obj = { ...item, ...description[0] };

            value.push(obj);
            console.log(value);
          })
        );

        res.json({
          success: true,
          data: {
            list: value,
          },
        });
      } else {
        res.json();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
  static async getProductVarients(id: string) {
    const desc = await getQuery(
      "SELECT * FROM `products_variations` WHERE Product_ID=" + id
    );
    return desc;
  }
}

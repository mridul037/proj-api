import { response } from "express";
const config = require("../config/appconfig");
const { getQuery } = require("../config/connection");

export class NavService {
  constructor() {}
  static async navbar(req: any, res: any) {
    try {
      const categoryItem = await getQuery(
        "SELECT * FROM `category` WHERE Parent_category_ID=0"
      );
      if (categoryItem) {
        const CategoryList: Array<Object> = [];

        categoryItem.map((item: any) => {
          let { Name, ID } = item;
          let obj = {
            path:'',
            theme: Name,
            type:'link'
          };
          CategoryList.push(obj);
        });
        const response = {
          success: true,
          data: {
            list: CategoryList,
          },
        };
        res.json(response);
      } else {
        res.status(200).send({
          status: false,
          message: "Category not found",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  
}

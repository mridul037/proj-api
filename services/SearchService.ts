import { response } from "express";
const config = require("../config/appconfig");
const { getQuery } = require("../config/connection");

export class SearchService {
  constructor() {}
  static async category(req: any, res: any) {
    try {
      const categoryItem = await getQuery(
        "SELECT * FROM `category` WHERE Parent_category_ID=0"
      );
      if (categoryItem) {
        const CategoryList:Array<Object>=[];
        
        categoryItem.map((item:any)=>{
            let {Name,ID}=item;
            let obj={
                id:ID,
                name:Name,
            }
            CategoryList.push(obj);
        });
        const response={
            success:true,
            data:{

               list:CategoryList
            }
        }
        res.json(response);
     
      } else {

        res.status(200).send({
            status: false,
            message: 'Category not found',
        });

      }
    } catch (err) {
      console.log(err);
    }
  }
  static async subCategory(req:any,res:any){
    try {
        if(req.body.ID!==undefined){
     const id=req.body.ID;
     const subCategoryItem = await getQuery(
    'SELECT * FROM `category` WHERE Parent_category_ID='+id);
      console.log(subCategoryItem);
      const subCategoryList:Array<string>=[];
      subCategoryItem.map((item:any)=>{
        let {Name,ID}=item;
        let obj={
            id:ID,
            name:Name,
        }
        subCategoryList.push(Name);
    

    }
    );
      const response={
            success:true,
            data:{
                list:subCategoryList
            }
      }
      res.json(response);
    }
    else{
    res.json({
        success:true,
        data:{
            list:[]
        }
    })
   }
    }
    catch(err){
       console.log(err);
    }
  }
}

export {};
const router = require('express').Router();
const mysql=require("mysql");

router.use('/', require('./auth'));
router.use('/home',require('./home'));
router.use('/search',require('./search'));

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database:"test",
    connectionLimit: 10,
})
con.connect(function(err:any){
    if(err){
      console.log(err);
      return;
    }
    console.log('Connection established');
  });
module.exports = router;

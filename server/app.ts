require('dotenv').config();
const express=require('express');
const cors=require('cors');
const uuid=require('uuid');
const app=express();

app.use(express.json());

app.use(cors());

app.use(require('../routes'))



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});

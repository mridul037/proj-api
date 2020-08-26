const router = require('express').Router();
import {CategoryService} from '../../services/CategoryService';


router.post('/',CategoryService.Category);


module.exports=router;
const router = require('express').Router();
import {SearchService} from '../../services/SearchService';


router.get('/category',SearchService.category)
router.post('/subcategory',SearchService.subCategory)

module.exports=router;
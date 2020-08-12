const router = require('express').Router();
import {HomeService} from '../../services/HomeService';


router.get('/banner',HomeService.banner);
router.get('/feature',HomeService.feature); 

module.exports=router;
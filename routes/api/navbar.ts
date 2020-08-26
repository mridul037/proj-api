const router = require('express').Router();
import {NavService} from '../../services/NavService';


router.get('/',NavService.navbar)

module.exports=router;
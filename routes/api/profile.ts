const router = require('express').Router();
import {ProfileService} from '../../services/ProfileService';


router.get('/',ProfileService.getProfile)
module.exports=router;
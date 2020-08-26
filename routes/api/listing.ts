const router = require('express').Router();
import {ListingService} from '../../services/ListingService';


router.post('/',ListingService.Listing);


module.exports=router;
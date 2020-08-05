const router = require('express').Router();
import {AuthService} from '../../services/AuthService';


router.post('/signup',AuthService.signUp);

router.post('/login',AuthService.login);
module.exports=router;
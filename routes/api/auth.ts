const router = require('express').Router();
import {AuthService} from '../../services/AuthService';

router.post('/signup',AuthService.signUp);

router.post('/login',AuthService.login);
router.delete('/logout',AuthService.logout);
router.post('/forgetpassword',AuthService.forgotPassword);
module.exports=router;
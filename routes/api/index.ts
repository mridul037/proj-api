export {};
const router = require('express').Router();


router.use('/', require('./auth'));
router.use('/home',require('./home'));
module.exports = router;
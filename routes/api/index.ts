export {};
const router = require('express').Router();

router.use('/', require('./auth'));
router.use('/home',require('./home'));
router.use('/search',require('./search'));
router.use('/profile',require('./profile'));
router.use('/navbar',require('./navbar'));
router.use('/category',require('./category'));
router.use('/listing',require('./listing'));
module.exports = router;

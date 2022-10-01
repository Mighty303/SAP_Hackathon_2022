const router = require('express').Router({mergeParams:true});

const characterRouter = require('./');
const locationRouter = require('./');

router.use('/:type', characterRouter);
router.use('/locations', locationRouter);

module.exports = router;
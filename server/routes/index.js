const router = require('express').Router({mergeParams:true});

const eventRouter = require('./events');
const userRouter = require('./users');

router.use('/events', eventRouter);
router.use('/users', userRouter);

module.exports = router;
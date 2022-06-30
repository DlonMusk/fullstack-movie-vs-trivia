// inport router and routes
const router = require('express').Router();
const userRouters = require('./userRoutes');


// set routes
router.use('/users', userRouters);


module.exports = router;
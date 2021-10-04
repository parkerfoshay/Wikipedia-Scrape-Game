const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/crawl', apiRoutes);

module.exports = router;
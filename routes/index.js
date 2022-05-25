const router = require('express').Router();
const apiRoutes = require('./apiRoutes');

router.use('/api', apiRoutes);
router.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

module.exports = router;
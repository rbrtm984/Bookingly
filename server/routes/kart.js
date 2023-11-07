const express = require('express');
const kartController = require('../controllers/kartController');
const router = express.Router();

router.use('/schedule', kartController.getRaceSchedule, (req, res) => {
    res.status(200).json(res.locals.schedule);
});

module.exports = router;
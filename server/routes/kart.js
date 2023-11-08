const express = require('express');
const kartController = require('../controllers/kartController');
const router = express.Router();

router.use('/schedule', kartController.getRaceSchedule, (req, res) => {
    res.status(200).json(res.locals.schedule);
});

router.use('/leaderboard', kartController.getLeaderBoard, (req, res) => {
    res.status(200).json(res.locals.leaderBoard);
});

module.exports = router;
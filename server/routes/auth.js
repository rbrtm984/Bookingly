const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


// test endpoint
router.get('/test', authController.getUser, (req, res) => {
    res.status(200).send(res.locals.data);
});

module.exports = router;
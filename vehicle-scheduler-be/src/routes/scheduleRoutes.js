const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.get('/schedule', scheduleController.getAllSchedules);
router.get('/schedule/:depotId', scheduleController.getDepotSchedule);

module.exports = router;
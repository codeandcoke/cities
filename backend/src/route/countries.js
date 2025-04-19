const express = require('express');
const router = express.Router();

router.get('/countries');
router.get('/countries/:country');
router.post('/countries');
router.put('/countries/:country');
router.delete('/countries/:country');

module.exports = router;
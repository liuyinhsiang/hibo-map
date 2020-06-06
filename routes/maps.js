const express = require('express');
// const router = express.Router({ mergeParams: true });
const router = express.Router();

const { getDefaultMaps } = require('../controllers/maps');

const Map = require('../models/Map');

router.route('/default').get(getDefaultMaps);

module.exports = router;

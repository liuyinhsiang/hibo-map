const ErrorResponse = require('../middleware/error');
const asyncHandler = require('../middleware/async');
const Map = require('../models/Map');

// @desc      Get all default maps
// @route     GET /api/v1/maps/default
// @access    Public
exports.getDefaultMaps = asyncHandler(async (req, res, next) => {
  const defaultMaps = await Map.find({ access: 'public' });

  return res.status(200).json({
    success: true,
    count: defaultMaps.length,
    data: defaultMaps,
  });
});

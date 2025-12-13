const express = require('express');
const router = express.Router();
const cropController = require('../controllers/crop.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, cropController.createCrop);
router.get('/', cropController.getCrops);
router.get('/:id', cropController.getCropById);
router.put('/:id', protect, cropController.updateCrop);
router.delete('/:id', protect, cropController.deleteCrop);

module.exports = router;

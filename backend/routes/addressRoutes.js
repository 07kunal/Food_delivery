const express = require('express')
const { createAddress, getAddress } = require('../controllers/addressController')

const { protect } = require('../middleware/authMiddleware')
const router = express.Router()




router.post('/', protect, createAddress)
router.get('/', protect, getAddress)


module.exports = router
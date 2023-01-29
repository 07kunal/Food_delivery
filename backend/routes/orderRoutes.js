const express = require('express')
const { createOrder, getOrder } = require('../controllers/orderController')


const { protect } = require('../middleware/authMiddleware')
const router = express.Router()




router.post('/', protect, createOrder)
router.get('/', protect, getOrder)


module.exports = router
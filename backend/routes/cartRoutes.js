const express = require('express')
const { createCarts, getCarts, UpdatedCart, DeleteCart, cartById } = require('../controllers/cartController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()



router.post('/', protect, createCarts)
router.get('/', protect, getCarts)
// router.get("/:id", protect, cartById)
// router.delete("/:id", protect, DeleteCart)
router
    .route('/:id')
    .get(protect, cartById)
    .delete(protect, DeleteCart)
    .put(protect, UpdatedCart)



module.exports = router;
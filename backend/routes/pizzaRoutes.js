const express = require('express');
const { getPizzas, postPizza } = require('../controllers/pizzaControler');
const router = express.Router()

router.route('/').get(getPizzas)
router.route('/').post(postPizza)

module.exports = router
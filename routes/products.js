const express = require('express')
const router = express.Router()
const { createProducts, getProducts, addToCart } = require('../controllers/products')

router.get('', getProducts)
router.post('', createProducts)
router.post('/add-to-cart/:userId', addToCart )


module.exports = router

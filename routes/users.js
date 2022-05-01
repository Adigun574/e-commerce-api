const express = require('express')
const router = express.Router()
const { login, register, getAUser } = require('../controllers/users')

router.post('/login', login)
router.post('/register', register)
router.get('/:id', getAUser)




module.exports = router

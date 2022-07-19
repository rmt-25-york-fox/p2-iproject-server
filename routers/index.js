const Users = require('../controllers/userController')
const router = require('express').Router()

router.post('/register',Users.regis)

module.exports = router
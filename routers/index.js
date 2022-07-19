const Users = require('../controllers/userController')
const router = require('express').Router()

router.post('/register',Users.regis)
router.post('/login',Users.login)

module.exports = router
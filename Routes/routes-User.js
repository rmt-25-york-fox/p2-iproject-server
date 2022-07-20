const express = require('express')
const router = express.Router()
const UserCon =require('../Controllers/Controller-User')



router.post('/register', UserCon.registerMember )



module.exports = router

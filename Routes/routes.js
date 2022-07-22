const express = require('express')
const router = express.Router()
const UserCon =require('../Controllers/Controller-User')
const PRouter = require('./routes-Preach')




router.post('/register', UserCon.registerMember ) 
router.post('/registerPastor', UserCon.registerPastor )
router.post('/login', UserCon.login )
router.use('/', PRouter)

module.exports = router
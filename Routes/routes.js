const express = require('express')
const router = express.Router()
const UserCon =require('../Controllers/Controller-User')
const PRouter = require('./routes-Preach')
const authentication = require('../Middlewares/authenticator')
router.get('/', (req, res)=>{
    res.status(200).json({
        message: "Landing Page"
    })
})




router.post('/register', UserCon.registerMember ) 
router.post('/registerPastor', UserCon.registerPastor )
router.post('/login', UserCon.login )
router.use(authentication)
router.use('/', PRouter)

module.exports = router
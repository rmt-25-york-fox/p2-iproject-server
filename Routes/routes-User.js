const express = require('express')
const router = express.Router()
const UserCon =require('../Controllers/Controller-User')



router.post('/register', UserCon.registerMember )
router.post('/registerPastor', UserCon.registerPastor )

router.post('/login', UserCon.login )




module.exports = router

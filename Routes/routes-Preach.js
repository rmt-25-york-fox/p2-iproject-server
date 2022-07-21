const express = require('express')
const router = express.Router()
const PreachCon = require('../Controllers/Controller-Preach')
const authorization = require('../Middlewares/authorization')
const authentication = require('../Middlewares/authenticator')

router.get('/', PreachCon.preachList)
router.use(authentication)
router.post('/add', authorization,PreachCon.addPreach)

module.exports = router
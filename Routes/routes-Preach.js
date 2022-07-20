const express = require('express')
const router = express.Router()
const PreachCon = require('../Controllers/Controller-Preach')
const authorization = require('../Middlewares/authorization')

router.post('/addPreach', authorization,PreachCon.addPreach)

module.exports = router
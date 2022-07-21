const express = require('express')
const router = express.Router()
const PreachCon = require('../Controllers/Controller-Preach')
const {authorizationPastor, authorizationMember} = require('../Middlewares/authorization')
const authentication = require('../Middlewares/authenticator')
const Subscription = require('../Controllers/Controller-Subcription')
router.get('/', PreachCon.preachList)
router.use(authentication)
router.get('/:id', PreachCon.preachById)
router.post('/:id/subscribe', authorizationMember, Subscription.createSubcription)

router.post('/add', authorizationPastor,PreachCon.addPreach)
router.get('/mypreaches', authorizationPastor,PreachCon.personalPreachList)
router.get('/mypreaches/:id', authorizationPastor,PreachCon.getUpdatePreach)
router.patch('/mypreaches/:id', authorizationPastor,PreachCon.patchUpdatePreach)





module.exports = router
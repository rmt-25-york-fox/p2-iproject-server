const express = require('express')
const router = express.Router()
const Subscription = require('../Controllers/Controller-Subcription')
const {authorizationPastor, authorizationMember} = require('../Middlewares/authorization')



router.get('/',authorizationMember, Subscription.subsList )
router.get('/:id',authorizationMember, Subscription.getPreachFromSublist)
router.delete('/:id',authorizationMember, Subscription.deleteSubscription)


module.exports = router
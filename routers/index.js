const Requests = require('../controllers/requestController')
const Users = require('../controllers/userController')
const authenticate = require('../middleware/authentication')
const router = require('express').Router()

router.post('/register',Users.regis)
router.post('/login',Users.login)
router.use(authenticate)
router.get('/userInfo',Requests.userInfo)
router.post('/request',Requests.addRequest)
router.get('/request',Requests.getRequest)
router.get('/myTask/',Requests.myTask)
router.get('/myRequests/',Requests.myRequest)
router.get('/request/:id',Requests.getDetailRequest)
router.patch('/request/:id',Requests.assignPic)
router.patch('/requests/:id',Requests.finishRequest)

module.exports = router
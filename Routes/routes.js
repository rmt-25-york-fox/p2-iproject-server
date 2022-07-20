const express = require('express')
const router = express.Router()
const URouter = require('./routes-User')


router.get('/', (req, res)=>{
    res.status(200).json({
        message: "Landing Page"
    })
})

router.use('/' , URouter)

module.exports = router
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = process.env.PORT||3000
const router = require('./routers')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',router) 
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
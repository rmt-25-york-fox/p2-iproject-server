if(process.env.NODE_ENV == "development"){
    require("dotenv").config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3050
const router = require('./Routes/routes')

const errorHandler= require('./Middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', router)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Pick port ${port} and run`)
})
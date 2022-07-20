const express = require('express')
const app = express()
const cors = require('cors')
const port =3000
const router = require('./Routes/routes')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', router)
app.listen(port,()=>{
    console.log(`Pick port ${port} and run`)
})
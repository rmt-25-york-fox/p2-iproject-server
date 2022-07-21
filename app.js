const express = require('express')
const {OAuth2Client} = require('google-auth-library');
const cors = require('cors')
const nodemailer = require('nodemailer')


var jwt = require('jsonwebtoken');

const axios = require('axios')
const { User, Post, Comment } = require('./models')
const multer = require('multer')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth:{
    user: "demo.tmagira@outlook.com",
    pass: "()()1234"
  }
})


const fileStorage = multer.diskStorage({
  destination: (req,res, cb) =>{
    cb(null, 'images')
  },
  filename: (req,res, cb) => {
    cb(null, new Date().getTime()+ '-'+ fileStorage.originalname)
  }
})

const fileFilter = (req,file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ){
    cb(null, true)
  }else{
    cb(null, false)
  }
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/all', async(req,res)=>{
  try {
    const allStatus = await Post.findAll(
      {order:[
        ['createdAt', 'DESC']
      ],
      include:[User]})

    res.status(200).json({
      statusCode: 200,
     data: allStatus
   })
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error'
   })
  }
})

app.get('/status/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const status = await Post.findOne({where:{id}, include:[User, {
      model: Comment,
      include: [User]
    }]})

    res.status(200).json({
      statusCode: 200,
      message: status
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error'
   })
  }
})

app.post('/login', async (req,res,next) => {
    
        try{
    
          console.log(req.headers.google_token, 'gtoken<<<<<<<<<')
          
          const googleToken = req.headers.google_token
    
          const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
          const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID, 
          });
          const payload = ticket.getPayload();

          console.log(payload)
          
          // find or create
          const [user, create] = await User.findOrCreate({
            where: {email: payload.email},
            defaults:{
              username: payload.name,
              email: payload.email,
              displayPic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            },
            hooks: false
          })
    
          const accessToken = jwt.sign({
            id: user.id,
         }, 'RAHASIA')
    
         req.headers.access_token = accessToken
    
         res.status(200).json({
            statusCode: 200,
           message: 'Google Login Successful',
           access_token: accessToken,
           username: user.username
         })
        }catch(err){
          res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error'
         })

        }
      }
)

app.use(async (req, res, next) => {
  try{
    const accessToken  = req.headers.access_token 

    if(!accessToken){
      throw {name: 'NOT_AUTHENTICATED'}
    }

    const decode = await jwt.verify(accessToken, 'RAHASIA')
    
    const findUser = await User.findOne({where: {id: +(decode.id)}})

    if(!findUser){
      throw {name: 'NOT_FOUND'}
    }

    req.user = {
      id: findUser.id,
      email: findUser.email
    }
    next()
  }catch(err){
  console.log(err)
  res.status(500).json({
    statusCode: 500,
    message: 'Internal Server Error'
 })
  }
})

app.post('/newComment', async(req,res)=>{
  try {
    const { postId, content } = req.body
    const userId = req.user.id

    const newComment = await Comment.create({
      content,
      UserId: userId,
      PostId: postId
    })

    console.log(userId, postId, content, "<<<commment")
  } catch (error) {
    console.log(err)
    res.status(500).json({
    statusCode: 500,
    message: 'Internal Server Error'
 })
  }
})

app.use(multer({storage: fileStorage, fileFilter}).single('imageUrl'))

app.post('/newStatus', async (req,res,next)=>{
  try {
    const UserId = req.user.id

    const { content } = req.body

    if(!req.file){
      imageUrl = ''
    }else{
      imageUrl = req.file.path
    }

    const newPost = await Post.create({
      content,
      imageUrl,
      UserId,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const options ={
      from: "demo.tmagira@outlook.com",
      to: req.user.email,
      subject: "New Post Created",
      text: "Congrats! You just uploaded a new post!"
    }
    

    transporter.sendMail(options, function(err,info){
      if(err){
        console.log(err)
      }else{
        console.log(info.response)
      }
    })

    res.status(201).json({
      statusCode: 201,
     message: 'New Post Created'
   })

  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error'
   })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
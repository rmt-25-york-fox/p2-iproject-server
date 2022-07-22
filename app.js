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

app.get('/', (req, res) => {
  res.send('Welcome to Our API')
})

//Third Party APIs
app.get('/news', async (req,res)=>{
  try {
    const options = {
      method: 'GET',
      url: 'https://east-china-news.p.rapidapi.com/japan',
      headers: {
        'X-RapidAPI-Key': 'd1a4221978msh5fbc3b65fc94825p195a8ajsna694357f70a6',
        'X-RapidAPI-Host': 'east-china-news.p.rapidapi.com'
      }
    };

    let data = await axios.request(options)

    res.status(200).json({
      statusCode: 200,
      data: data.data
   })
    
  } catch (error) {
    console.log(error)
  }
})



app.get('/trans', async (req,res)=>{
  try {
   const text = req.query.status
   let result = text

   if(text){
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", "en");
    encodedParams.append("target_language", "ja");
    encodedParams.append("text", text);

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'b2e88e3adcmsh00c5ffa1863a001p13f410jsn2199699aa890',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      data: encodedParams
    };

    await axios.request(options).then(function (response) {
	    result = response.data.data.translatedText
    }).catch(function (error) {
	    console.error(error);
    });
   }

   console.log(result)

   res.status(200).json({
    statusCode: 200,
    result
  })

  }catch (error) {
    console.log(error)
  }
})

app.get('/kanji', async(req,res)=>{
  try {
    let {grade} = req.query

    if(!grade){
      grade = 1
    }
    
    const data = await axios.get('https://kanjiapi.dev/v1/kanji/grade-'+grade)

    res.status(200).json({
      statusCode: 200,
      data: data.data
   }) 

  } catch (error) {
    console.log(error)
  }
})

app.get('/kanjidetails/:kanji', async (req,res)=>{
  try {
    let kanji = req.params.kanji

    let url =  'https://kanjiapi.dev/v1/kanji/'+kanji

    const data = await axios.get(encodeURI(url))

    res.status(200).json({
      statusCode: 200,
      data: data.data
   })    
  } catch (error) {
    console.log(error)
  }
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


//Multer

const fileStorage = multer.diskStorage({
  destination: (req,file, cb) =>{
    cb(null, 'images')
  },
  filename: (req,file, cb) => {
    cb(null, new Date().getTime()+ '-'+ file.originalname)
  }
})

var storage = multer.memoryStorage()

const fileFilter = (req,file, cb) => {
  if(file.mimetype.startsWith("image")){
    console.log(file, "<<<FAILez")
    cb(null, true)
  }else{
    cb(null, false)
  }
}

app.post('/newStatus', multer({storage: storage, fileFilter}).single('imageInput'),  async (req,res,next)=>{
  try {
    const UserId = req.user.id
    const { content } = req.body

    let imageInput = req.file

    if(!req.file){
      imageInput = ''
    }else{
      imageInput = req.file.buffer.toString("base64")
    }

    console.log(imageInput)

    const newPost = await Post.create({
      content,
      imageUrl : imageInput,
      UserId,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // const options ={
    //   from: "demo.tmagira@outlook.com",
    //   to: req.user.email,
    //   subject: "New Post Created",
    //   text: "Congrats! You just uploaded a new post!"
    // }
    

    // transporter.sendMail(options, function(err,info){
    //   if(err){
    //     console.log(err)
    //   }else{
    //     console.log(info.response)
    //   }
    // })

    res.status(201).json({
      statusCode: 201,
     message: 'New Post Created'
   })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error'
   })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
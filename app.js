const express = require('express')
const {OAuth2Client} = require('google-auth-library');
const cors = require('cors')

var jwt = require('jsonwebtoken');

const axios = require('axios')
const { User } = require('./models')

const app = express()
const port = 3000

app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
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
           username: User.username
         })
        }catch(err){
          console.log(err)

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
    }
    next()
  }catch(err){
  console.log(err)
    next(err)
  }
})

app.post('/newStatus', (req,res,next)=>{
  try {
    const UserId = req.user.id
    const { content, imageUrl } = req.body
  } catch (error) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
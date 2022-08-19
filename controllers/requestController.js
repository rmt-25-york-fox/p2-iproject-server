const { Request,User } = require('../models')
const {Op} = require('sequelize')
const axios = require("axios");

class Requests {
    static async addRequest (req,res,next){
        try { 
            const UserId = req.user.id
            const status = 'New'
            let logasi = ''
            let timezone = ''
            const { title,description,points } = req.body
            const checkPoint = await User.findOne({where:{id:UserId}})
            if(checkPoint.points < points) throw {name:'Insufficient points'}
            const decrease = await User.decrement({points:points},{where:{id:UserId}})
            const response = await axios({
                method: "GET",
                url: `https://spott.p.rapidapi.com/places/ip/me`,
                headers: {
                    'X-RapidAPI-Key': '8255cb8690msh49bb7bd03bb98e8p11b0b5jsnfc4e654d1ba6',
                    'X-RapidAPI-Host': 'spott.p.rapidapi.com'
                }
            })
            logasi = response.data.name
            timezone = response.data.timezoneId
            const resp = Request.create({title,description,points,status,UserId,location:logasi,timezone})
            res.status(201).json(
                resp
            )
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    static async getRequest (req,res,next){
        try {
            const resp = await Request.findAll({where:{[Op.not]:[{status:'Done'}]},include:[User]})
            res.status(200).json(
                resp
            )
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    static async assignPic (req,res,next){
        try {
            const picId = req.user.id
            const id = req.params.id
            const status = 'Taken'
            const checkId = await Request.findOne({where:{id}})
            if(picId === checkId.UserId) throw {name:`Can't assign yourself`}
            if(checkId.status === 'Taken') throw {name:'Request Taken already'}
            const pic = await User.findOne({where:{id:picId}})
            const resp = await Request.update({status,picId,picName:pic.name,updatedAt:new Date()},{where:{id}})
            res.status(200).json(
                'Success assign'
            )
        } catch (err) {
            
            next(err)
            
        }
    }
    static async finishRequest (req,res,next){
        try {
            const UserId = req.user.id
            const id = req.params.id
            const status = 'Done'
            const request = await Request.findOne({where:{id}})
            if(UserId !== request.UserId) throw {name:'Request Forbidden'}
            if(request.status === 'Done') throw {name:`Can't edit status anymore`}
            const resp = await Request.update({status,updatedAt:new Date()},{where:{id}})
            const updatePoint = await User.increment({points:request.points},{where:{id:request.picId}})
            res.status(200).json(
                'Success update'
            )
        } catch (err) {
            next(err)
            
        }
    }
    static async getDetailRequest (req,res,next){
        try {
            const id = req.params.id
            const resp = await Request.findOne({where:{id},include:[User]})
            if(!resp) throw {name:'Request Not Found'}
            res.status(200).json(
                resp
            )
        } catch (err) {
            next(err)
        }
    }
    static async myRequest (req,res,next){
        try {
            const UserId = req.user.id
            const resp = await Request.findAll({where:{UserId},include:[User]})
            res.status(200).json(
                resp
            )
        } catch (err) {
            next(err)
        }
    }
    static async myTask (req,res,next){
        try {
            const UserId = req.user.id
            const resp = await Request.findAll({where:{picId:UserId},include:[User]})
            res.status(200).json(
                resp
            )
        } catch (err) {
            next(err)
        }
    }
    static async userInfo (req,res,next){
        try {
            const id = req.user.id
            const resp = await User.findOne({where:{id}})
            res.status(200).json(
                resp
            )
        } catch (err) {
            next(err)
        }
    }
    static async TTS (req,res,next){
        try {
            const id = req.params.id
            const ini = await Request.findOne({where:{id}})
            const isi = ini.description
            const response = await axios({
                method: "POST",
                url: `https://voice-text-to-speech.p.rapidapi.com/read`,
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': '15e7f036dfmshb2f4ad7caf70f82p1243aejsn5ad613488a21',
                    'X-RapidAPI-Host': 'voice-text-to-speech.p.rapidapi.com'
                },
                data:`{"text":"${isi}","voice":"std-en-US-01","format":"mp3"}`
            })
            res.status(200).json( response.data.data.audio );
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    static async deleteRequest(req,res,next){
        try {
            const id = req.params.id 
            const UserId = req.user.id
            const checkRequest = await Request.findOne({where:{id}})
            if(!checkRequest) throw ({name:'Request Not Found'})
            if(UserId !== checkRequest.UserId) throw ({name:'Request Forbidden'})
            if(checkRequest.status === 'Done') throw ({name:`Can't delete finished request`})
            const updatePoint = await User.increment({points:checkRequest.points},{where:{id:checkRequest.UserId}})
            const resp = await Request.destroy({where:{id}})
            res.status(200).json(
                'Success Delete Request'
            )
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = Requests
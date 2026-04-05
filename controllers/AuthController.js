const userService = require('../service/user-service')
const Post = require('../models/Post')
const User  = require('../models/User')
class AuthController {
    async registration(req , res ,next){
        try{
        const {email , password ,name ,grade ,stack} = req.body
        const data = await userService.registration(email , password ,name ,grade ,stack)
        res.cookie('refresh' , data.refresh , {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
            return res.json(data)
    }catch(e){
        res.status(404).json({message: e.message})
        next(e)
    }
}
    async login(req , res ,next){
        try{
        const {email , password} = req.body
        const data = await userService.login(email , password)
        res.cookie('refresh' , data.refresh , {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
            return res.json(data)
    }catch(e){
            res.status(404).json({message: e.message})
            next(e)
        }
    }
    async logout(req , res ,next ){
        try{
            const {refresh} = req.cookies
            const data = await userService.logout(refresh)
            res.clearCookie('refresh')
            res.json(data)
        }
        catch(e){
            res.status(404).json({message: e.message})
            next(e)
        }
    }
    async activate(req , res ,next){
        try{
            const {link} = req.params
            await userService.activate(link)
            return res.redirect(process.env.CLIENT_URL) 
        }
        catch(e){
            next(e)
        }
    }
    async getProfile(req , res ,next){
        try{
            const userData = req.user
            return res.json(userData)
        }catch(e){
            next(e)
        }
    }
async getUserById(req, res, next) {
    try {
        const { id } = req.params;
        const userData = await userService.getUserById(id);
    return res.json(userData)
    } catch (e) {
        next(e);
    }
}
}
module.exports = new AuthController()
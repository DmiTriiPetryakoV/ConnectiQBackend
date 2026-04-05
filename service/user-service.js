const User = require('../models/User')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const tokenService = require('./token-service');
const UserDto = require('../Dto/user-dto')
const mailService = require('./mail-service')
const Post = require('../models/Post')
class UserRegistration {
    async registration (email , password ,name ,grade ,stack){
        try{
        if(await User.findOne({email})){
            throw new Error ('user not accaunt')
        }
            const hashpassword = await bcrypt.hash(password , 12)
            const activationLink = uuid.v4()
            const user =  await User.create({
                email:email,
                password:hashpassword,
                activationLink,
                isActivated:false,
                grade:grade,
                stack:stack,
                name:name,
                    })
                await mailService.sendActivationink(email ,`${process.env.API_URL}/api/activate/${activationLink}`)
                    const userDto = new UserDto(user)
                    const tokens = tokenService.generateTokens({...userDto})
                    tokenService.saveToken(userDto.id, tokens.refresh);
                    
                        return{
                        ...tokens,
                        user:userDto
                    }
            }catch(e){
                console.log(e)
                throw new Error(e)
        }

    }
    async activate(activationLink){
        const user  = await User.findOne({activationLink})
        if(!user){
            throw new Error('error')
        }
        user.isActivated = true
        await user.save()
        
        return user
    }
    async login(email , password){
        const user = await User.findOne({email})
        if(!user){
            throw new Error('user not found')
        }
        if(!await bcrypt.compare(password , user.password)){
            throw new Error('login')
        }
        if(!user.isActivated){
            throw new Error('user doent activated account')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id , tokens.refresh)

        return {...tokens , user:userDto} 
    }
    async logout(userId , refresh){
        const logoutData = await tokenService.removeToken(userId , refresh)
        return logoutData
    }

async getUserById(id) {
    const user = await User.findById(id).lean();
    if (!user) throw ApiError.BadRequest('Пользователь не найден');
    const posts = await Post.find({ author: id });
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);

    user.likes = totalLikes;
    user.postsCount = posts.length;

    return user;
}


}
module.exports =  new UserRegistration()
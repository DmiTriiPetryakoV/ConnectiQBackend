const jwt = require('jsonwebtoken')
const BD_TOKEN_MODEL = require('../models/Token.js')


class Token {
    generateTokens(payload){
        const access = jwt.sign(payload , process.env.ACCESS_TOKEN ,{expiresIn:'30m'})
        const refresh = jwt.sign(payload , process.env.REFRESH_TOKEN , {expiresIn:'30d'})
        return {access , refresh}
    }
    async saveToken(userId , refresh){
        try{
        const data  = await BD_TOKEN_MODEL.findOne({user:userId})
        if(data){
            data.refresh = refresh
            await data.save()
            return data
        }
        else{
           await BD_TOKEN_MODEL.create({user:userId , refresh})
        }
    }catch(e){
        throw new Error('token')
        }
    }
    async removeToken(refresh){
        const data = await BD_TOKEN_MODEL.findOne({user:userId})
        if(data){
            await data.deleteOne({user:userId, refresh:refresh})
        }
        return data
    }
    validateAccessToken(token){
        try{
            const userData = jwt.verify(token , process.env.ACCESS_TOKEN)
            return userData
        }catch(e){
            return null
        }
    }
    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token , process.env.REFRESH_TOKEN)
            return userData
        }catch(e){
            throw new Error('validateToken')
    }
}
    async findToken(refresh) {
        const tokenData = await BD_TOKEN_MODEL.findOne({ refresh });
        return tokenData;
    }
}
module.exports = new Token()
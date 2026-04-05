const tokenservice = require('../service/token-service')


module.exports = function(req , res ,next){
    try{
        const authHeder = req.headers.authorization;
        if(!authHeder){
            return res.status(401).json({message:'Не авторизован'})
        }
        const token = authHeder.split(' ')[1]
        if(!token){
            return res.status(401).json({message:'Плохой токен'})
        }
        const userData = tokenservice.validateAccessToken(token)
        if(!userData){
            return res.status(401).json({message:"Нет данных"})
        }
        req.user = userData 
        next()
    }catch(e){
        return res.status(401).json({ message: 'Не авторизован' })
    }
}
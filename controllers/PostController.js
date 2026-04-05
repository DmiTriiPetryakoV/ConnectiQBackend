const postService = require('../service/post-service')
const postModel = require('../models/Post')
class PostController{
    async create(req , res ,next){
        try{
        const {author,data} = req.body
        const call = await postService.create(author , data)
        return res.json(call)
        }catch(e){
            next(e)
        }

    }
     async read(req , res ,next){
        try{
            const call = await postService.read()
            return res.json(call)
        }catch(e){
            next(e)
        }
    }
     async update(req , res ,next){
      try{
            const {id} = req.params
            const data = req.body
            const call = await postService.update(id,data)
            return res.json(call)
        }catch(e){
            next(e)
        }
    }
     async delete(req , res ,next){
      try{
        const  { id } = req.params
        const call = await postService.delete(id) 
        return res.json(call)
    }catch(e){
            next(e)
        }
    }
    async getAllPost(req , res ,next){
        try{
        const data = await postService.getAllPost()
        return res.json(data)
        }
        catch(e){
            next(e)
        }

    }
    async updatePost(req , res ,next){
        try{
        const {id} = req.params
        const {status} = req.body
        const data = await postService.updateStatus(id , status)
        return res.json(data)
        }
        catch(e){
            next(e)
        }
    }
    async likePost(req , res , next){
        try{
        const userId = req.user.id
        const {id} = req.params
        const response = await postService.postLikes(id, userId)
        return res.json(response)
        }
        catch(e){
            console.log(e)
        }
    }
    async getUserPosts(req , res ,next){
        try{    
             console.log('req.user:', req.user)
            const userId = req.user.id
            const posts = await postModel.find({author:userId}).populate('author').sort({createdAt: -1})
            return res.json(posts)
        }catch(e){
            next(e)
        }
    }
}
module.exports = new PostController()
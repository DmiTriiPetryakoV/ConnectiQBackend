const postModel = require('../models/Post')

class Post{
    async create(author , data){
        const post = await postModel.create({
            author:author,
            data:data,
            status:'pending'
        })
        return post
    }

    async read(){
        const data = await postModel.find({status:'approved'}).populate('author', 'name grade')
        console.log('posts:', JSON.stringify(data))
        return {data}
    }
    
    async update(id , newData){
        const post = await postModel.findById(id)
        post.data = newData
        await post.save()
        return post
    }
    
    async delete(id){
        const data = await postModel.findById(id)
        await data.deleteOne()
        return data
    }
    async getAllPost(){
        const data = await postModel.find({})
        return data
    }
    async updateStatus(id , status){
        const data = await postModel.findByIdAndUpdate(id , {status} )
        return data
    }
    async postLikes(postId , userId){
        const post = await postModel.findById(postId)
        if(post.likedBy.includes(userId)){
            post.likedBy.pull(userId)
            post.likes--
        }else{
            post.likedBy.push(userId)
            post.likes++    
        }
        await post.save()
        return post.populate('author')
    }
}

module.exports = new Post()
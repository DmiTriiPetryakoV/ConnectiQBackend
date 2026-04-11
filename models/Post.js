const mongoose = require('mongoose')
const {Schema} = mongoose
const postSchema = new Schema({
    data:{type:String},
    status:{type:String , default:'approved'},
    author:{type:mongoose.Schema.Types.ObjectId ,ref:'User'},
    likes:{type:Number , default:0},
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})
const Post = mongoose.model('Post', postSchema)
module.exports = Post
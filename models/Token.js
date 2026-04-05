const mongoose = require('mongoose')

const {Schema} = mongoose

const tokenSchema = new Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    refresh:{type:String}
})
const token = mongoose.model("refresh" , tokenSchema)

module.exports = token
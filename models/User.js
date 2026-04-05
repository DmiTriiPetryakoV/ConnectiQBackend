const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    email:{type:String,required:true,trim:true,unique:true,lowercase: true , match: [/^\S+@\S+\.\S+$/, 'Пожалуйста, введите корректный email']},
    password:{type:String,required:true,trim:true},
    activationLink: { type: String },
    isActivated:{type:Boolean,default:false},
    name:{type:String , required:true,},
    grade:{type:String , default:''},
    stack:{type:Array , default:[]},
    create:{type:Date , default:()=> Date.now()},
    likes: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
})
const User = mongoose.model('User' , userSchema)
module.exports = User
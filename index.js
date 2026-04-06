const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config()

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174','http://localhost:5175','http://localhost:5176', 'https://connecti-q-theta.vercel.app'
],  
  credentials: true
}));


const router = require('./routes/index')


app.use('/api' , router)


app.get('/' , (req , res) => {
    res.json({message:'hello world'})
})


async function start(){
   try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB подключена')
    app.listen(process.env.PORT || 1921 , () => {
        console.log('GOOD WORK')
        })
    }catch(e){
        console.log(e)
    }
}
start()
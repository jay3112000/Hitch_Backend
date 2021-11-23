const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv/config')
const cors=require('cors')
// const bodyparser=require('body-parser')
const app=express();
const authroute=require('./routes/auth')
const postroute=require('./routes/posts')
const userroute=require('./routes/user')
const commentroute=require('./routes/comments')
const multer = require("multer");
app.use(express.json())
app.use(cors())
const path = require("path");
const DB=process.env.DB_data

// app.use(bodyparser.json())
mongoose.connect(DB).then(()=>
{
    console.log('success')
}
).catch((err)=>{
    console.log(err)
})

app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
  

 app.use('/api/user',authroute)
 app.use('/api/post',postroute)
 app.use('/api/users',userroute)
 app.use('/api/comments',commentroute)

app.get('/',(req,res)=>{
    res.send('login/signup code')
})

app.listen(3000,()=>console.log('Server Running'))


const router = require("express").Router();
const Comment = require("../model/Comments");
const User = require("../model/User");

//create a comment

router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all comments on a post

router.get("/:id",async(req,res)=>{
    try{
        const comments=await Comment.find({"postId":req.params.id})
        res.json(comments)

    }catch(err){
        res.status(400).json(err);
    }
})

//reply to a comment
router.put("/reply/:id",async(req,res)=>{
    try{
        const comments=await Comment.findById(req.params.id)
        await Comment.updateOne({ $push: { replies: req.body.reply } });
        res.status(200).json("Your reply has been saved");

    }catch(err){
        res.status(400).json(err);
    }
})

module.exports = router;
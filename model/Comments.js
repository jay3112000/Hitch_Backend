const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId:{
      type:String,
      required:true
    },
    comment:{
        type:String,
      required:true
    },
    replies: {
        type: Array,
        default: [],
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", CommentSchema);
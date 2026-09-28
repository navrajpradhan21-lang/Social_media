import mongoose from "mongoose";
import authRouter from "../routes/auth.routes";


const postSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    mediaType:{
        type:String,
        enum:["image","video"],
        required:true
    },
    media:{
        type:String,
        required:true
    },
    
    caption:{
        trype:String,

    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    comments:[
        {
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        message:{
            type:{String}
        }
        }
    ]

},{timestamps:true})

const PostModel = mongoose.model("Post",postSchema)
export default PostModel;

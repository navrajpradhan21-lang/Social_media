import uploadOnCloudinary from "../config/cloudinary";
import PostModel from "../models/post.model";
import UserModel from "../models/user.models";



export const uploadPost = async(req,res)=>{
    try{
        const{caption,mediaType} = req.body
        let media;
        if(req.file){
            media = await uploadOnCloudinary(req.file.path)
        }else{
            return res.status(400).json({message:"media is required"})
        }
        const post = await PostModel.create({
            caption,media,mediaType,author:req.userId
        })
        const user = await UserModel.findById(req.userId)
        user.posts.push(post._id)
        await user.save()

        const populatedPost = await PostModel.findById(post._id).populate("author","name userName profileImage")
        return res.status(201).json(populatedPost)

    }catch(error){
        return res.status(500).json({
            message:`uploadPost error ${error}`
        })
    }
}

export const getAllPosts = async(req,res)=>{
    try{
        const posts = await PostModel.find({})
            .populate("author","name userName profileImage")
            .populate("comments.author","name userName profileImage").sort({createdAt:-1})
            return res.status(200).json(posts)

    }catch(error){
        return res.status(500).json({
            message:`getallpost error ${error}`})
    }
}

export const like = async(req,res)=>{
    try{

        const postId = req.params.postId
        const post = await PostModel.findById(postId)
        if(!post){
            return res.status(400).json({message:"post not found"})
        }
        const alreadyLiked = post.likes.some(id=>id.toString()
            ==req.userId.toString())

        if(alreadyLiked){
            post.likes = post.likes.filter(id=>id!= req.userId)
        }else{
            post.likes.push(req.userId)
        }
        await post.save()
        post.populate("author","name userName profileImage")  
        return res.status(200).json(post)   
    }catch(error){
        return res.status(500).json({message:`likepost error ${error}`})
    }
}
export const comments = async(req,res)=>{
    try{
        const{message} = req.body
        const postId = req.params.postId
        const post = await PostModel.findById(postId)
        if(!post){
            return res.status(400).json({message:"post not found"})
        }
        post.comments.push({
            author:req.userId,
            message
        })

        await post.save()
        await post.populate("author","name userName profileImage"),
        await post.populate("comments.author")

    }catch(error){
        return res.status(500).json({message:`Comments post error ${error}`})
    }
}

export const saved = async(req,res)=>{
    try{
        const postId = req.params.postId
        const user = await UserModel.findById(postId) 
        const alreadySaved = user.saved.some(id=>id.toString()== postId.toString())
        // true ya false and ayega
        if(alreadySaved){
            user.saved = user.saved.filter(id=>id.toString() !=postId.toString())
        }else{
            user.saved.push(postId)

        }
        await user.save()
        user.populate('saved')
        return res.status(200).json(user)
    }catch(error){
        return res.status(500).json({ message: `saved  error ${error}` })

    }
}


import uploadOnCloudinary from "../config/cloudinary";
import LoopModel from "../models/loop.models";
import UserModel from "../models/user.models";


// Upload

export const uploadLoop = async(req,res)=>{
    try{
        const {caption} = req.body
        let media;
        if(req.file){
            media = await uploadOnCloudinary(req.file.path)
        }else{
            return res.status(400).json({message:"media is required"})
        }
        const loop= await LoopModel.create({
            caption,media, author:req.userId
        })
        const user = await UserModel.findById(req.userId)
        user.loops.push(loop._id)
        await user.save()
        const populatedLoop = await LoopModel.findById(loop._id).populate("author","name userName profileImage")
        return res.status(201).json(populatedLoop)
    }catch(error){
        return res.status(500).json({message:`uploadloop error ${error}`})
    }
}

// get all the loops

export const getAllLoops = async(req,res)=>{
    try{
        const loops = await LoopModel.find({})
        .populate("author","name userName profileImage") // authoe
        .populate("comments.author") // users who commented

        return res.status(200).json(loops)
    }catch(error){
        return res.status(500).json({message:`getALlLoop error ${error}`})
    }
}

// like

export const like = async(req,res)=>{
    try{
        const loopId = req.params.loopId
        const loop = await LoopModel.findById(loopId)
        if(!loop){
             return res.status(400).json({message:"loop not found"})
        }
        const alreadyLikedLoop = loop.likes.some(id=>id.toString()== req.userId.toString())

        if(alreadyLikedLoop){
            loop.likes = loop.likes.filter(id=>id.toString() != req.userId.toString())
        }else{
            loop.likes.push(req.userId)
        }
        await loop.save()
        await loop.populate("author","name userName profileImage")
        return res.status(200).json(loop)

    }catch(error){
        return res.status(500).json({message:`Like error ${error}`})
    }
}

// comments

export const comments = async(req, res)=>{
    try{
        const{message} = req.body
        const loopId = req.params.loopId

        const loop = await LoopModel.findById(loopId)
        if(!loop){
             return res.status(400).json({message:"loop not found"})
        }

        loop.comments.push({
            author:req.userId,
            message
        })
        await loop.save()
        await loop.populate('author',"name userName profileImage")
        await loop.populate("comments.author")
        return res.status(200).json(loop)

    }catch(error){
        return res.status(500).json({message:`Comments error ${error}`})
    }
}

export const saved = async(req,res)=>{
    try{
        const loopId = req.params.loopId
        const user = await UserModel.findById(req.userId)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const alreadySaved = user.savedLoops.some(id=>id.toString()==loopId.toString())
        if(alreadySaved){
            user.savedLoops = user.savedLoops.filter(id=>id.toString()!=loopId.toString())
        }else{
            user.savedLoops.push(loopId)
        }
        await user.save()
        await user.populate('savedLoops')
        return res.status(200).json(user)

    }catch(error){
        return res.status(500).json({message:`Save error ${error}`})
    }
}
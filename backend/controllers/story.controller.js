import uploadOnCloudinary from "../config/cloudinary.js";
import StoryModel from "../models/story.model.js";
import UserModel from "../models/user.models.js";



// upload 
export const uploadStory = async(req,res)=>{
    try{
        const user = await UserModel.findById(req.userId)
        if(user.story){
            await StoryModel.findByIdAndDelete(user.story)
            user.story = null
        }
        const {mediaType} = req.body
        let media;
        if(req.files){
            media = await uploadOnCloudinary(req.file.path)
        }else{
            return res.status(400).json({message:`media is required`})
        }
        const story = await StoryModel.create({
            author:req.userId, mediaType,media
        })
        user.story = story._id
        await user.save()
        const populatedStory = await StoryModel.findById(story._id)
        .populate("author","name userName profileImage")
        return res.status(200).json(populatedStory)
    }catch(error){
        return res.status(500).json({
            message:`story upload error ${error}`
        })
    }

}

// Get all the stories
export const GetAllStories = async(req,res)=>{
    try{
        const currentUser = await User.findById(req.userId)
        const stories = await Story
        

    }catch(error){
        return res.status(500).json({
            message:`All Stories ${error}`
        })
    }
}


// get Story by user Name 




// View Story
export const viewStory = async(req,res)=>{
    try{
        const storyId = req.params.storyId
        const story = await Story.findById(storyId)
        if(!story){
            return res.status(400).json({message:"Story not found"})
        }

    }catch(error){

    }
}






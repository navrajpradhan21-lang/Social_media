import genToken from "../config/token.js";
import UserModel from "../models/user.models.js";
import bcrypt from "bcryptjs";
import sendMail from "../config/Mail.js";


// signup
export const signUp = async (req,res)=>{
    try{
        const {name, email ,password, userName} = req.body

        const findBYEmail = await UserModel.findOne({email})
        if(findBYEmail){
            return res.status(400).json({
                message:"Email already exist !"
            })
        }
        const findbyuserName = await UserModel.findOne({userName})
        if(findbyuserName){
            return res.status(400).json({
                message:"UserName already exist !"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        // Create User
        const user = await UserModel.create({
            name,
            userName,
            email,
            password:hashedPassword
        })
        // jwt token
        const token = genToken(user._id) // jwt token

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT === "production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(201).json(user)

    }catch(error){
        return res.status(500).json({message:`signUp error ${error}`})

    }
}

// login
export const login = async(req,res)=>{
    try{
        const {userName,password}= req.body
        const user = await UserModel.findOne({userName})

        if(!user){
            return res.status(400).json({message:"User is not exist"})

        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:"incorrect Password"})
        }
        let token = genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user)

    }catch(error){
        return res.status(500).json({message:`login error ${error}`})

    }
}

// logout
export const logout = async(req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({
            message:"Logout Successfully"
        })

    }catch(error){
        return res.status(500).json({
            message:`Logout error ${error}`
        })
    }
}

export const sendOtp = async(req,res)=>{
    try{
        const {email} = req.body
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const otp = Math.floor(1000+Math.random()*9000).toString()

        user.resetOtp = otp,
        user.otpExpires = Date.now()+5*60*1000
        user.isOtpVerified = false

        await user.save()
        await sendMail(email,otp)
        return res.status(200).json({
            message:"email successfully send"
        })

    }catch(error){
        return res.status(500).json({message:`send otp error ${error}`})
    }
}

export const verifyOtp = async(req,res)=>{
    try{
        const {email ,otp} =req.body
        const user = await UserModel.findOne({email})

        if(!user || user.resetOtp!==otp || user.otpExpires < Date.now()){
            return res.status(400).json({message:"invalid/expired otp"})
        }

        user.isOtpVerified = true,
        // now removing the otp 
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()
        return res.status(200).json({message:"otp verified"})
            
        
    }catch(error){
        return res.status(500).json({
            message:`verify otp error ${error}`
        })
    }
}

export const resetPassword = async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await UserModel.findOne({email})
        if(!user || !user.isOtpVerified){

            return res.status(400).json({message:'otp verification required'})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        user.password = hashedPassword
        user.isOtpVerified = false
        
        await user.save()
        
    }catch(error){
        return res.status(500).json({message:`rest otp error ${error}`})
    }
}
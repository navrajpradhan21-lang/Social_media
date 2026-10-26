import express from "express";
import isAuth from '../middleware/isAuth.js'
import { getCurrentUser, getProfile, suggestedUsers,editProfile } from "../controllers/user.controller.js";


const userRouter = express.Router()

userRouter.get('/current',isAuth,getCurrentUser)
userRouter.get('/suggested',isAuth,suggestedUsers)
userRouter.get('/getProfile/:userName',isAuth,getProfile)

export default userRouter;

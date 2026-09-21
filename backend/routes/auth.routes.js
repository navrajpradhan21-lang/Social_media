import express from 'express'
import { login,logout,resetPassword,sendOtp,signUp, verifyOtp } from '../controllers/auth.controllers.js'


const authRouter = express.Router()

authRouter.post('/signup',signUp )
authRouter.post('/login',login)
authRouter.get('/logout',logout)
authRouter.post("/sendOtp",sendOtp)
authRouter.post('/verifyOtp',verifyOtp)
authRouter.post("/resetPassword",resetPassword)


export default authRouter;

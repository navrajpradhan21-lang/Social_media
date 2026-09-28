import express from "express";
import isAuth from "../middleware/isAuth.js";
import {upload} from "../middleware/multer.js";
import { uploadPost,getAllPosts, saved, comments } from "../controllers/post.controllers";

const postRouter = express.Router()

postRouter.post("/upload",isAuth,upload.single("media"),uploadPost)
postRouter.get('/getAll',isAuth,getAllPosts)
postRouter.get("/like/:postId",isAuth,like)
postRouter.get("/saved/:postId",isAuth,saved)
postRouter.post("/comment/:postId",isAuth,comments)


export default postRouter;

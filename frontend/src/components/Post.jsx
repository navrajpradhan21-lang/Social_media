import dp from '../assets/dp.jpg';
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { MdOutlineComment } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setPostData } from '../../redux/postSlice';
import { setUserData } from '../../redux/userSlice';
import axios from "axios";
import { serverUrl } from '../App';

const Post = ({ post }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    const { postData } = useSelector(state => state.post)
    const [showComment, setshowComment] = useState(false)
    const [message, setMessage] = useState("")

    const handleLike = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/post/like/${post._id}`, { withCredentials: true })
            const updatedPost = result.data
            const updatedPosts = postData.map(p => p._id == post._id ? updatedPost : p)
            dispatch(setPostData(updatedPosts))
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleComment = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/post/comment/${post._id}`, {message}, { withCredentials: true })
            const updatedPost = result.data

            const updatedPosts = postData.map(p => p._id == post._id ? updatedPost : p)
            dispatch(setPostData(updatedPosts))
            console.log("comment send")

        } catch (error) {
            console.log(error.response)
        }

    }

    const handleSaved = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/post/saved/${post._id}`, { withCredentials: true })
            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error.response)
        }
    }


    return (
        <div className='w-[90%] min-h-112.5 flex flex-col gap-2.5
       bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl'>
            <div className='w-full h-20 flex justify-between items-center px-2.5'>
                <div className='flex items-center justify-center gap-2.5 md:gap-5'>
                    <div className="w-10 h-10 md:w-15 md:h-15 border-2 border-black cursor-pointer
                    overflow-hidden rounded-full"onClick={() => navigate(`/profile/${postData.author.userName}`)}>
                        <img src={post.author?.profileImage || dp} alt="" />
                    </div>
                    <div className='w-40 font-semibold truncate'>{post.userName}</div>
                </div>
                {/* Follow Button */}
                <button className='px-2.5 py-2.5 w-15 md:w-20 h-7.5 md:h-10 bg-black text-white rounded-2xl text-[14px] items-center
                 md:text-[16px]'>Follow</button>
            </div>
            {/* Media */}
            <div className='w-[90%] max-w-125 h-62.5 flex  items-center justify-center '>
                {post.mediaType == 'image' && <div className='w-[90%] max-w-125 h-62.5 flex flex-col items-center justify-center  mt-[5vh]'>
                    <img src={post.media} alt="" className='h-full rounded-2xl' />
                </div>}

                {post.mediaType == 'video' && <div className='w-[90%] max-w-125 h-62.5 flex flex-col items-center justify-center  mt-[5vh]'>
                    <VideoPlayer media={post.media} />
                </div>}

            </div>

            {/* Like comment save icon */}
            <div className='w-full h-15 flex items-center justify-between px-5 py-5'>
                {/*Like Comment */}
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center justify-between gap-2' >
                        {!post.likes.includes(userData._id) ? <FaRegHeart className='w-5 h-5 cursor-pointer' onClick={handleLike} /> : <FaHeart className='w-5 h-5 cursor-pointer text-red-600' onClick={handleLike} />}
                        <span>{post.likes.length}</span>
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <MdOutlineComment className='w-5 h-5 cursor-pointer' onClick={() => setshowComment(prev => !prev)} />
                        <span>{post.comments.length}</span>
                    </div>
                </div>
                {/* Save Icon */}
                <div onClick={handleSaved}>
                    {!userData.saved.includes(post?._id)&& <FaRegBookmark className='w-5 h-5 cursor-pointer' />}
                    {userData.saved.includes(post?._id)&&<FaBookmark className='w-5 h-5 cursor-pointer' />}
                </div>
            </div>
            {/* Caption */}
            {post.caption && <div className='w-full px-5 gap-2.5 flex justify-start
            items-center'>
                <h1>{post.author.userName}</h1>
                <div>{post.caption}</div>
            </div>}

            {/* Show comments */}
            {showComment &&
                <div className='w-full  flex flex-col gap-7.5 pb-7.5'>
                    <div className='w-full h-20 flex items-center justify-between px-5 relative'>
                        <div className='w-10 h-10 md:w-15 md:h-15 border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                            <img src={post.author?.profileImage || dp} alt="" className='w-full object-cover' />
                        </div>
                        <input type="text" className='px-2.5 border-b-2 border-b-gray-500 w-[90%] outline-none h-10' placeholder='Write comment...' onChange={(e) => setMessage(e.target.value)} value={message} />
                        <button className='absolute right-5 cursor-pointer' onClick={handleComment}><IoMdSend className='w-6.25 h-6.25' /></button>
                    </div>
                    <div className='w-full max-h-75 overflow-auto'>
                        {post.comments?.map((com,index)=>(
                            <div key={index} className='w-full px-[20px] py-[20px]  flex items-center gap-[20px] border-b-2 border-b-gray-200'>
                               <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                                    <img src={com.author?.profileImage || dp} alt="" className='w-full object-cover' />
                               </div>
                               <div>{com.message}</div>
                            </div>

                        ))}

                    </div>
                </div>
            }

        </div>
    )
}

export default Post
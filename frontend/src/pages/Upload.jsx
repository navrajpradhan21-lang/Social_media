import React, { useRef } from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GrAdd } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import VideoPlayer from '../components/VideoPlayer';
import { serverUrl } from '../App';
import { setPostData } from '../../redux/postSlice';
import axios from 'axios';

const Upload = () => {
    const navigate = useNavigate()
    const [uploadType, setuploadType] = useState("post")
    const [frontendMedia, setfrontendMedia] = useState(null)
    const [backendMedia, setbackendMedia] = useState(null)
    const [mediaType, setmediaType] = useState("")
    const [caption, setcaption] = useState("")

    const mediaInput = useRef()
    const dispatch = useDispatch()
    const { postData } = useSelector(state => state.post)
    const { storyData } = useSelector(state => state.story)
    const { loopData } = useSelector(state => state.loop)

    const [loading, setloading] = useState(false)


    const handleMedia = (e) => {
        const file = e.target.files[0]
        console.log(file)
        if (file.type.includes("image")) {
            setmediaType("image")
        } else {
            setmediaType("video")
        }
        setbackendMedia(file)
        setfrontendMedia(URL.createObjectURL(file))
    }

    const uploadPost = async () => {
        try {
            const formData = new FormData()
            formData.append("caption", caption)
            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)
            const result = await axios.post(`${serverUrl}/api/post/upload`, formData, { withCredentials: true })
            dispatch(setPostData([...postData, result.data]))
            setloading(false)
            navigate("/")
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    const uploadStory = async () => {
        try {
            const formData = new FormData()
            formData.append("caption", caption)
            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)
            const result = await axios.post(`${serverUrl}/api/post/upload`, formData, { withCredentials: true })
            dispatch(setStoryData([...storyData, result.data]))
            setloading(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    const uploadLoop = async () => {
        try {
            const formData = new FormData()
            formData.append("caption", caption)
            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)
            const result = await axios.post(`${serverUrl}/api/post/upload`, formData, { withCredentials: true })
            dispatch(setLoopData([...loopData, result.data])) // purana data as it is rahe aur ussmay baki add ho jaye
            setloading(false)
            navigate("/")
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpload = () => {
        setloading(true)
        if (uploadType == "post") {
            uploadPost()
        } else if (uploadType == "story") {
            uploadStory()
        } else {
            uploadLoop()
        }

    }
    return (
        <div className='w-full h-screen bg-black flex flex-col items-center '>
            {/* BackArrow */}
            <div className='w-full h-20  flex items-center gap-5 px-5'>
                <MdOutlineKeyboardBackspace className='text-white cursor-pointer w-6.25  h-6.25 ' onClick={() => navigate(`/`)} />
                <h1 className='text-white text-[20px] font-semibold'>Upload Media</h1>
            </div>
            {/* Top bar of Upload */}
            <div className='w-[90%] max-w-150 bg-white h-20 rounded-full flex justify-around items-center gap-2.5'>

                <div className={`${uploadType == "post" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full
                 hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black transition-all`} onClick={() => setuploadType("post")}>
                    Post
                </div>

                <div className={`${uploadType == "story" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full
                 hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black transition-all`} onClick={() => setuploadType("story")}>
                    Story
                </div>

                <div className={`${uploadType == "loop" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full
                 hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black transition-all`} onClick={() => setuploadType("loop")}>
                    Loop
                </div>
            </div>
            {/* Upload section */}
            {!frontendMedia && <div className='w-[80%] max-w-125 h-62.5 bg-[#0e1316] border-gray-50-800 
            border-2 flex flex-col items-center justify-center gap-8px mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]' onClick={() => mediaInput.current.click()}>
                <input type="file" hidden ref={mediaInput} onChange={handleMedia} />
                <GrAdd className='text-white w-6.5 h-6.5 cursor-pointer' />
                <div className='text-white text-[19px] font-semibold'>Upload {uploadType}</div>
            </div>}

            {frontendMedia && <div className='w-[80%] max-w-125 h-62.5 flex flex-col items-center justify-center  mt-[15vh]'>
                {mediaType == 'image' && <div className='w-[80%] max-w-125 h-62.5 flex flex-col items-center justify-center  mt-[5vh]'>
                    <img src={frontendMedia} alt="" className='h-[60%] rounded-2xl' />
                    {uploadType != 'story' && <input type="text" className='w-full border-b-gray-400 border-b-2 outline-none px-2.5 py-1.25 text-white mt-5'
                        placeholder='write caption' onChange={(e) => setcaption(e.target.value)} value={caption} />}
                </div>}

                {mediaType == 'video' && <div className='w-[80%] max-w-125 h-62.5 flex flex-col items-center justify-center  mt-[5vh]'>
                    <VideoPlayer media={frontendMedia} />
                    {uploadType != 'story' && <input type="text" className='w-full border-b-gray-400 border-b-2 outline-none px-2.5 py-1.25 text-white mt-5'
                        placeholder='write caption' onChange={(e) => setcaption(e.target.value)} value={caption} />}
                </div>}

            </div>}

            {frontendMedia && <button className='px-2.5 w-[60%] max-w-100   py-1.25 h-12.5 bg-[white] mt-12.5 cursor-pointer rounded-2xl'
                onClick={handleUpload}>
                {loading ? <ClipLoader size={30} color='black' /> : `Upload ${uploadType}`}
            </button>}



        </div>
    )
}

export default Upload;
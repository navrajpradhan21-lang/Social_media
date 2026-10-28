import React, { useRef } from 'react'
import { FiVolume2 } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";
import { useState } from 'react';

const VideoPlayer = ({media}) => {
    const videoTag = useRef()
    const [mute, setmute] = useState(false)
    const [IsPlaying, setIsPlaying] = useState(true)

    const handleClick = ()=>{
        if(IsPlaying){
            videoTag.current.pause()
            setIsPlaying(false)
        }else{
            videoTag.current.play()
            setIsPlaying(true)
        }
    }

  return (
    <div className='h-full relative cursor-pointer max-w-full rounded-2xl overflow-hidden'>
        <video ref={videoTag} autoPlay loop muted={mute} src={media} className='h-full cursor-pointer w-full object-cover rounded-2xl'onClick={handleClick}/>
        <div className='absolute bottom-2.5 right-2.5' onClick={()=>setmute(prev=>!prev)}>
            {!mute?<FiVolume2 className='w-5 h-5 text-white font-semibold'/>:<FiVolumeX className='w-5 h-5 text-white font-semibold'/> }
        </div>
    </div>
  )
}

export default VideoPlayer
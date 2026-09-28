import React from 'react'
import dp from '../assets/dp.jpg'


const StoryDp = ({ProfileImage,userName}) => {
    return (
    <div  className='flex flex-col w-20'>
        <div className='w-20 h-20 bg-linear-to-b from-blue-500  to-blue-950 rounded-full flex justify-center items-center '>
        <div className="flex items-center gap-2.5">
            <div className="w-17.5 h-17.5 border-2 border-black cursor-pointer
            overflow-hidden rounded-full">
                <img src={dp} alt="" />
            </div>
        </div>    
        </div>
        <div className='text-[14px] text-white text-center truncate w-full'>{userName}</div>



    </div>
    )
}

export default StoryDp;
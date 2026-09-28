import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import logo from "../assets/logo1.png"
import StoryDp from './StoryDp';
import Nav from './Nav';


const Feed = () => {
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-screen lg:h-screen relative lg:overflow-y-auto'>
      {/* Vibe logo and heart icon for phone */}
      <div className='w-full h-25 flex items-center justify-between p-5 lg:hidden'>
        <img src={logo} alt="" className='w-20' />
        <div className='relative z-100'>
          <FaRegHeart className='text-white w-7.5 h-7.5' />
        </div>
      </div>

      {/* Story DP  */}
      <div className='flex w-full overflow-auto gap-5 items-center p-2.5'>
        <StoryDp userName={"lcosjccpockcosnrhoncf"}/>
        <StoryDp userName={"kjhcxcnweox"}/>
        <StoryDp userName={"kjhcxcnweox"}/>
        <StoryDp userName={"kjhcxcnweox"}/>
        <StoryDp userName={"kjhcxcnweox"}/>
        <StoryDp userName={"kjhcxcnweox"}/>
        <StoryDp userName={"kjhcxcnweox"}/>
        <StoryDp userName={"kjhcxcnweox"}/>
        <StoryDp userName={"kjhcxcnweox"}/>
        <StoryDp userName={"kjhcxcnweox"}/>
        <StoryDp userName={"kjhcxcnweox"}/>
      </div>
      {/* Post wala area */}
      <div className='bg-white rounded-t-[60px] w-full min-h-screen flex flex-col 
      items-center gap-5 p-2.5 pt-10 relative pb-30 '>

      <Nav/>  

      </div>

    </div>
  )
}

export default Feed;
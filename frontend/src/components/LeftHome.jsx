import React from 'react'
import logo from "../assets/logo.png"
import { FaRegHeart } from "react-icons/fa";
const LeftHome = () => {
  return (
    <div className='w-[25%] hidden lg:block min-h-screen bg-[black] border-r-2 border-gray-900'>
        <div>
            <img src={logo}alt="" />
            <div>
                <FaRegHeart />
            </div>
        </div>
    </div>
  )
}

export default LeftHome;
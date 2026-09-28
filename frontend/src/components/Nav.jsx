import React from 'react'
import dp from '../assets/dp.jpg';
import { MdHome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";
import { GrAdd } from "react-icons/gr";

const Nav = () => {
    return (
        <div className='w-[90%] lg:w-[40%] h-20 bg-black flex justify-around
    items-center fixed bottom-5 rounded-full shadow-2xl shadow-[#000000] z-100'>

        {/* ICONS OF NAVbar */}

        <div><MdHome className='text-white w-6.5 h-6.5 ' /></div>
        <div><FaSearch className='text-white w-6.5 h-6.5 '/></div>
        <div><GrAdd className='text-white w-6.5 h-6.5 '/></div>
        <div><RxVideo className='text-white w-6.5 h-6.5 '/></div>
       
        {/* Profile  */}
        <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 border-2 border-black cursor-pointer
            overflow-hidden rounded-full">
                <img src={dp} alt="" />
            </div>
        </div>


        </div>
    )
}

export default Nav
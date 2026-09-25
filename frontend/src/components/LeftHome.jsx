import logo from "../assets/logo1.png"
import { FaRegHeart } from "react-icons/fa";
import dp from '../assets/dp.jpg';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../../redux/userSlice";

const LeftHome = () => {
    const {userData}= useSelector(state=>state.user)
    const dispatch = useDispatch()
    const handleLogOut = async()=>{
        try{
            const result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
            dispatch(setUserData(null))
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className='w-[25%] hidden lg:block min-h-screen bg-[black] border-r-2 border-gray-900'>
        <div className='w-full h-25 flex items-center justify-between p-5'>
            <img src={logo} alt="" className='w-20'/>
            <div className='relative z-100'>
                <FaRegHeart className='text-white w-7.5 h-7.5'/>
            </div>
        </div>

        {/* Profile*/}
            <div className='flex items-center gap-2.5'>
                <div className="w-17.5 h-17.5 border-2 border-black cursor-pointer
                overflow-hidden rounded-full">
                    <img src={userData.profileImage || dp} alt="" />
                </div>
            {/* UserName*/}
            <div>
                <div className="text-white font-semibold text-[18px]">{userData.userName}</div>
                <div className="text-[15px] text-gray-300">{userData.name}</div>
            </div>

            <div className='text-blue-500 font-semibold cursor-pointer' onClick={handleLogOut}>Log Out</div>
        </div>
        {/* Suggest User */}
        <div className="w-full flex flex-col gap-5 p-5">
            <h1 className="text-white text-[19px]"> Suggested Users </h1>
        </div>
        
        

    </div>
  )
}

export default LeftHome;
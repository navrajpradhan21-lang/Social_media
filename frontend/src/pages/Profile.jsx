import axios from 'axios'
import React from 'react'
import { serverUrl } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, setUserData } from '../../redux/userSlice'
import { useEffect } from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import dp from '../assets/dp.jpg';
import Nav from '../components/Nav'

const Profile = () => {
  const navigate = useNavigate()
  const { userName } = useParams()
  const dispatch = useDispatch()
  const { profileData,userData } = useSelector(state => state.user)
  const handleProfile = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/getProfile/${userName}`, { withCredentials: true })
      dispatch(setProfileData(result.data))

    } catch (error) {
      console.log(error)

    }
  }
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/logout`, { withCredentials: true })
      dispatch(setUserData(null))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleProfile()
  }, [userName, dispatch])
  return (
    <div className='w-full min-h-screen bg-black'>

      <div className='w-full h-20 flex justify-between items-center px-7.5 text-white'>
        {/* back icon */}
        <div onClick={() => navigate("/")}><IoArrowBackSharp className='text-white cursor-pointer w-[25px]  h-[25px] ' /></div>
        {/* userName */}
        <div className='font-semibold text-[20px]'>{profileData?.userName || "New User"}</div>
        {/* Logout */}
        <div className='font-semibold cursor-pointer text-[20px] text-blue-500 ' onClick={handleLogOut} >Log Out</div>
      </div>

      <div className='w-full h-37.5 flex items-start gap-5 lg:gap-12.5 pt-2.5 px-2.5
      justify-center'>
        <div className='w-20 h-20 md:w-35 md:h-35 border-2 border-black rounded-full cursor-pointer overflow-hidden'>
          <img src={profileData?.profileImage || dp} alt="" className='w-full object-cover' />
        </div>

        <div>
          <div className='font-semibold text-[22px] text-white'>{profileData?.name}</div>
          <div className='text-[17px] text-[#ffffffe8]'>{profileData?.profession || "New User"}</div>
          <div className='text-[17px] text-[#ffffffe8]'>{profileData?.bio}</div>
        </div>
      </div>
      {/* follwers following and post */}
      <div className='w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-white'>

        {/* POST */}
        <div>
          <div className='text-white text-[22px] md:text-[30px] font-semibold'>{profileData?.posts.length}</div>
          <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Posts</div>
        </div>

        {/* Followers */}
        <div>
          <div className='flex item-center justify-center gap-[20px]'>
            <div className='flex relative'>
              <div className='w-10 h-10  border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                <img src={profileData?.profileImage || dp} alt="" className='w-full object-cover' />
              </div>

              <div className='w-10 h-10  border-2 border-black rounded-full cursor-pointer overflow-hidden absolute left-1.5'>
                <img src={profileData?.profileImage || dp} alt="" className='w-full object-cover' />
              </div>

              <div className='w-10 h-10  border-2 border-black rounded-full cursor-pointer overflow-hidden absolute left-3.5'>
                <img src={profileData?.profileImage || dp} alt="" className='w-full object-cover' />
              </div>
            </div>
            <div className='text-white text-[22px] md:text-[30px] font-semibold'>{profileData?.followers.length}</div>
          </div>
          <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Followers</div>
        </div>
        {/* Following */}
        <div>
          <div className='flex item-center justify-center gap-[20px]'>
            <div className='flex relative'>
              <div className='w-10 h-10  border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                <img src={profileData?.profileImage || dp} alt="" className='w-full object-cover' />
              </div>

              <div className='w-10 h-10  border-2 border-black rounded-full cursor-pointer overflow-hidden absolute left-1.5'>
                <img src={profileData?.profileImage || dp} alt="" className='w-full object-cover' />
              </div>

              <div className='w-10 h-10  border-2 border-black rounded-full cursor-pointer overflow-hidden absolute left-3.5'>
                <img src={profileData?.profileImage || dp} alt="" className='w-full object-cover' />
              </div>
            </div>
            <div className='text-white text-[22px] md:text-[30px] font-semibold'>{profileData?.following.length}</div>
          </div>
          <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Following</div>
        </div>
        

      </div>

      {/* Edit Profile button */}
      <div className='w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]'>
        {profileData?._id == userData._id 
        && 
        <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl'
        onClick={()=>navigate("/editprofile")}>Edit Profile</button> }

        {profileData?._id != userData._id
        &&
        <>
        <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl'>Follow</button>
        <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl'>Message</button>
        </>
        }
      </div>

      {/* POST */}
      <div className='w-full min-h-[100vh]  flex justify-center'>
        <div className='w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px] pb-[100px]'></div>
        <Nav/>

      </div>




    </div>
  )
}

export default Profile
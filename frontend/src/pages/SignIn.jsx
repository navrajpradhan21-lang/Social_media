
import { ClipLoader } from 'react-spinners';
import logo from '../assets/logo.png';
import logo1 from '../assets/logo1.png';
import { useState } from 'react';
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUserData } from '../../redux/userSlice';
import { serverUrl } from '../App';

const SignIn = () => {
    const [inputclicked, setinputClicked] = useState({
        name:false,
        userName:false,
        email:false,
        password:false
    })
    const [showPassword, setshowPassword] = useState("")
    const [userName, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setLoading] = useState("")

    const [err, setErr] = useState("")

    const navigate =useNavigate();
    const dispatch = useDispatch()

    const handleSignIn = async ()=>{
        setLoading(true)
        setErr("") 
        try{
            const result = await axios.post(`${serverUrl}/api/auth/login`,{userName,password},{withCredentials:true})
            dispatch(setUserData(result.data))
            setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
            setErr(error.response?.data?.message)

        }
    }

  return (
    <div className='w-full h-screen bg-linear-to-b from-black to-gray-900 flex flex-col 
    justify-center items-center'>

        <div className='w-[90%] lg:max-w-[60%] h-150 bg-white rounded-2xl
        flex justify-center items-center overflow-hidden border-2 border-[#lalf23]'>
            
            {/* FORM leftside wala div */}
            <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center
            p-2.5 gap-5'>
                <div className='flex gap-2.5 items-center text-[20px] font-semibold
                mt-10 '>
                    <span>Sign In to</span>
                    <img src={logo} alt=""
                    className='w-25' />
                </div>

                {/* UserName */}
                <div className='relative flex items-center justify-start w-[90%] h-12.5 rounded-2xl mt-7.5 border-2 border-black '
                onClick={()=>setinputClicked({...inputclicked,userName:true})}>
                    <label htmlFor="username" className={`text-gray-700 absolute left-5 p-5 h-[50%] flex items-center bg-white text-[15px] ${inputclicked.userName ? "-top-5":""}`}>Enter Your UserName </label>
                    <input type="text" id='username'className='w-full h-full rounded-2xl px-5 outline-none border-0' required
                    onChange={(e)=>setusername(e.target.value)} value={userName}/>
                </div>
                {/* Password */}
                <div className='relative flex items-center justify-start w-[90%] h-12.5 rounded-2xl mt-7.5 border-2 border-black '
                onClick={()=>setinputClicked({...inputclicked,password:true})}>
                    <label htmlFor="password" className={`text-gray-700 absolute left-5 p-5 h-[50%] flex items-center bg-white text-[15px] ${inputclicked.password ? "-top-5":""}`}>Enter Your Password</label>
                    <input type={showPassword?"text":"password"} id='password' className='w-full h-full rounded-2xl px-5 outline-none border-0' required
                    onChange={(e)=>setpassword(e.target.value)} value={password}/>

                    {!showPassword?<IoEye className='absolute cursor-pointer right-5 w-6.5 h-6.5' onClick={()=>setshowPassword(true)}/>:
                    <FaEyeSlash className='absolute cursor-pointer right-5 w-6.5 h-6.5' onClick={()=>setshowPassword(false)}/>
                    }
                </div>
                {err && <p className='text-red-500'>{err}</p>}

                {/* SignIn button */}
                <button className='w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-12 rounded-2xl
                cursor-pointer hover:bg-gray-800'onClick={handleSignIn} disabled={loading}>{loading?<ClipLoader size={30} color='white'/>:"Sign In"}</button>

                {/* paragraph */}

                <p className='text-gray-800 cursor-pointer'>Don't have an account ? <span className='border-b-2 border-b-black pb-3px
                 text-black' onClick={()=>navigate('/signup')}>
                    Sign Up
                </span>
                </p>

            </div>
            {/* logo RIGHT DIV */}
            <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] 
            flex-col gap-2.5 text-white text-[16px] font-semibold rounded-l-[30px]
            shadow-2xl shadow-black'>

                <img src={logo1} alt="" className='w-[40%]'/>
                <p>Not just a platform ,It's A VIBE</p>
            </div>

        </div>
        
    </div>
  )
}

export default SignIn;
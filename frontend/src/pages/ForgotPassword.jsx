import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { serverUrl } from '../App'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom';




const ForgotPassword = () => {
  const [step, setStep] = useState(1)
  const [inputClicked, setinputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmNewPasword: false
  });
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [err, setErr] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleStep1 = async () => {
    setLoading(true)
    setErr("")
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sendOtp`, { email }, { withCredentials: true })
      console.log(result.data)
      setStep(2)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setErr(error.response.data.message)
    }
  }

  const handleStep2 = async () => {
    setLoading(true)
    setErr("")
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verifyOtp`, { email, otp }, { withCredentials: true })
      console.log(result.data)
      setStep(3)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setErr(error.response.data.message)
    }
  }

  const handleStep3 = async () => {
    if (newPassword !== confirmNewPassword) {
      return setErr("Password Do not match")
    }
    setErr("")
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/resetPassword`, { email, password:newPassword }, { withCredentials: true })
      console.log(result.data)
      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
      setErr(error.response.data.message)
    }
  }


  return (
    <div className='w-full h-screen bg-linear-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
      {step == 1 && <div className='w-[90%] max-w-124  h-125 bg-white rounded-2xl flex justify-center items-center flex-col   border-[#1a1f23]'>
        <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
        <div className='relative flex items-center mt-7.5 justify-start w-[90%] h-12.5 rounded-2xl  border-2 border-black' onClick={() => setinputClicked({ ...inputClicked, email: true })}>
          <label htmlFor="email" className={`text-gray-700 absolute left-5 p-5 bg-white text-[15px] h-3 flex items-center ${inputClicked.email ? "-top-6" : ""}`}>Enter email</label>
          <input type="email" name="" id="email" className='w-full h-full rounded-2xl px-5 outline-none border-0' required onChange={(e)=>setEmail(e.target.value)} value={email}/>

        </div>
        {/* Button */}
        {err && <p className='text-red-500'>{err}</p>}
        <button className='w-[70%] px-5 py-3 bg-black text-white font-semibold h-12.5 cursor-pointer rounded-2xl mt-7.5' disabled={loading} 
        onClick={handleStep1}>{loading?<ClipLoader size={30} color='white'/>:"Send OTP"}
        </button>
        </div>}
        {step == 2 && <div className='w-[90%] max-w-124  h-125 bg-white rounded-2xl flex justify-center items-center flex-col   border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
          <div className='relative flex items-center mt-7.5 justify-start w-[90%] h-12.5 rounded-2xl  border-2 border-black' onClick={()=>setinputClicked({...inputClicked,otp:true})} >
            <label htmlFor="otp" className={`text-gray-700 absolute left-5 p-1.25 bg-white text-[15px] ${inputClicked.otp ? "-top-6" : ""}`}>Enter OTP</label>
              <input type="text" id="otp" className='w-full h-full  rounded-2xl px-10 outline-none border-0' required onChange={(e)=>setOtp(e.target.value)} value={otp}/> 
          </div>
        {err && <p className='text-red-500'>{err}</p>}
        <button className='w-[70%] px-5 py-3 bg-black text-white font-semibold h-12.5 cursor-pointer rounded-2xl mt-7.5' disabled={loading}
        onClick={handleStep2} > {loading?<ClipLoader size={30} color='white'/>:"Submit"}
        </button>
        </div>}

        {step==3 && <div className='w-[90%] max-w-124  h-125 bg-white rounded-2xl flex justify-center items-center flex-col   border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Reset Password</h2>
          <div className='relative flex items-center mt-7.5 justify-start w-[90%] h-12.5 rounded-2xl  border-2 border-black' onClick={()=>setinputClicked({...inputClicked,newPassword:true})}>
            <label htmlFor="newPassword"  className={`text-gray-700 absolute left-5 p-1.25 bg-white text-[15px] ${inputClicked.newPassword ? "-top-6" : ""}`}>Enter New Password</label>
            <input type="password" id='newPassword' className='w-full h-full rounded-2xl px-5 outline-none border-0' required onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}/>
          </div>
          <div className='relative flex items-center mt-7.5 justify-start w-[90%] h-12.5 rounded-2xl  border-2 border-black' onClick={()=>setinputClicked({...inputClicked,confirmNewPassword:true})}>
            <label htmlFor="confirmNewPassword" className={`text-gray-700 absolute left-5 p-1.25 bg-white text-[15px] ${inputClicked.confirmNewPassword? "-top-6" : ""}`}>Confirm New Password</label>
            <input type="password" id='confirmNewPassword' className='w-full h-full rounded-2xl px-5 outline-none border-0' required onChange={(e)=>setConfirmNewPassword(e.target.value)} value={confirmNewPassword}/>
          </div>
          {err && <p className='text-red-500'>{err}</p>}
          <button className='w-[70%] px-5 py-3 bg-black text-white font-semibold h-12.5 cursor-pointer rounded-2xl mt-7.5' disabled={loading} 
          onClick={handleStep3}>{loading?<ClipLoader size={30} color='white'/>:"Reset Password"}
          </button>
          </div>}

      


    </div>
  )
}

export default ForgotPassword;
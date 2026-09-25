import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import getCurrentUser from './hooks/getCurrentUser'
import { Navigate } from 'react-router-dom'
export const serverUrl = "http://localhost:8000"
const App = () => {
  
  getCurrentUser()
  const {userData} = useSelector(state=>state.user)
  

  return (
    <Routes>
      <Route path='/signup' element={!userData?<Signup/>:<Navigate to={"/"}/>}/>
      <Route path='/signIn' element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
      <Route path='/logout' element={!userData?<Signup/>:<Home/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to={"/signin"}/>}/>
      <Route path='/forgotpassword' element={!userData?<ForgotPassword/>:<Navigate to={"/"}/>}/>
    </Routes>
      
  )
}

export default App;

      
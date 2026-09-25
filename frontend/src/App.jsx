import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import getCurrentUser from './hooks/getCurrentUser'

export const serverUrl = "http://localhost:8000"
const App = () => {
  getCurrentUser()
  const {userData} = useSelector(state=>state.user)
  

  return (
    <Routes>
      <Route path='/signup' element={!userData?<Signup/>:<Home/>}/>
      <Route path='/signIn' element={!userData?<SignIn/>:<Home/>}/>
      <Route path='/logout' element={!userData?<Signup/>:<Home/>}/>
      <Route path='/' element={userData?<Home/>:<SignIn/>}/>
      <Route path='/forgotpassword' element={!userData?<ForgotPassword/>:<Home/>}/>
    </Routes>
      

  )
}

export default App;

      
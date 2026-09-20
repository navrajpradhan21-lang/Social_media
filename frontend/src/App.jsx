import React from 'react'

import { Route, Router, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'

const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signIn' element={<SignIn/>}/>
      <Route path='/logout' element={<Signup/>}/>
    </Routes>
      

  )
}

export default App

      
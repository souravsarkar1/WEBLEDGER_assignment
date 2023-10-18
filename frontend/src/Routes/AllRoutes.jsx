import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import RecipiMain from '../Pages/Recipes/RecipiMain'
import Signup from '../Pages/Signup/Signup'
import Contact from '../Pages/Contact/Contact'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/recipes' element={<RecipiMain/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes

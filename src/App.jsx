import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Homenav from '../components/Home/Homenav'
import HomePage from '../components/Home/HomePage'
import MainPage from '../components/Opening/MainPage'
import Profile from '../components/Profile/Profile'
import UserProfile from '../components/Profile/UserProfile'
import ProfileGallary from '../components/Profile/ProfileGallary'
import UploadForm from '../components/Profile/UploadForm'
import Payment from '../components/Payment/Payment'

import Invoice from '../components/Payment/Invoice'
import Order from '../components/Home/Order'
import Login from '../components/Opening/Login'
import Register from '../components/Opening/Register'
import { useState } from 'react'




function App() {
  const [search, setSearch] = useState('')
  const currentLocation = useLocation();
  const isLoginPage = currentLocation.pathname === '/';
  const isprofilePage = currentLocation.pathname === '/profile';
  const isuploadPage = currentLocation.pathname === '/uploadForm';
  const login = currentLocation.pathname === '/login';
  const register = currentLocation.pathname === '/register';

  return (
    <>

      {isLoginPage || isprofilePage || isuploadPage || login || register ? '' : <Homenav setSearch={setSearch} />}

      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/profile' element={<Profile />} />

       
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<HomePage search={search} />} />
        <Route path='/userprofile/:id' element={<UserProfile />} />
        <Route path='/profileGallary' element={<ProfileGallary />} />
        <Route path='/uploadForm' element={<UploadForm />} />
        <Route path='/order' element={<Order />} />
        <Route path='/payment/:id' element={<Payment />} />
        <Route path='/invoice' element={<Invoice />} />


      </Routes>
    </>
  )
}

export default App

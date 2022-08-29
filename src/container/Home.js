import React, {useState, useRef, useEffect} from 'react';
import {HiMenu} from 'react-icons/hi';
import {AiFillCloseCircle} from 'react-icons/ai';
import {Link, Route, Routes} from 'react-router-dom';
import {Sidebar, UserProfile, Pins} from '../components';
import {client} from '../utils/client';
import logo from '../assets/logo.png'
import useAuthStore from '../store/authStore';
import {userQuery} from '../utils/data';
import {Login} from '../components'
function Home() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const {currentUser, setUser} = useAuthStore();
  const scrollRef = useRef();
  console.log('currentUser', currentUser)
  useEffect(() => {
    const query = userQuery(currentUser?._id);
    client.fetch(query)
    .then(res => {
      console.log('resed', res)
      // setUser(res.data)
    })
  }, [])
  console.log('currentUser', currentUser)
  return (
    <>
    {currentUser ? (
      
      <div className='flex bg-grey-50 md:flex-row h-full flex-col transaction-height duration-75 ease-out '>
        <div className=' hidden lg, md:flex h-screen flex-initial '>
          <Sidebar user={currentUser && currentUser} closeToggle={() => setToggleSidebar(false)} />
        </div>
        <div className='flex lg, md:hidden flex-row'>
          <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
            <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)}/>
          <Link to='/'>
          <img src={logo} alt={logo} className='w-28' />
          </Link>
          <Link to={`/user-profile/${currentUser?._id}`}>
            <img src={currentUser?.image} className='w-28' />
          </Link>
          </div>
          
        </div>
        {toggleSidebar && 

          (<div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex  items-center p-2'>
              <Sidebar  user={currentUser && currentUser} closeToggle={() => setToggleSidebar(false)} />
              <div className="absolute lg:hidden w-full flex justify-end items-center p-2 top-3 right-3">
                <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
              </div>
              
            </div>
          </div>)
          }
          <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
            <Routes>
              <Route path='/user-profile/:userId' element={<UserProfile />} />
              <Route path='/*' element={<Pins user={currentUser} closeToggle={() => setToggleSidebar(false)} />} />
            </Routes>
          </div>
      </div>
    ) : <Login />}
      
    </>
  )
}

export default Home

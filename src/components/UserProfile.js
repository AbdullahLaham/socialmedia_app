import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import {signOut} from "firebase/auth";
import {auth} from '../utils/firebase';
import useAuthStore from '../store/authStore';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../utils/client';
import {MasonryLayout, Spinner, Login} from '../components';
import {FcGoogle} from 'react-icons/fc';

function UserProfile() {
  const [user, setUserr] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('');
  const [activeBtn, setActiveBtn] = useState();
  const navigate = useNavigate();
  // fetching userId from the route link 
  const {userId} = useParams();
  // the current user
  const {setUser, currentUser} = useAuthStore();
  console.log('current', currentUser)
  // some special styles 
  const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
  const unActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query)
    .then((data) => {
      setUserr(data[0])
      // console.log('data', data[0])
    })
  }, [userId]);

  useEffect(() => {
    if (text == 'Created') {
      const query = userCreatedPinsQuery(currentUser._id);
      client.fetch(query)
      .then(data => {
        // console.log('created pins', data)
        setPins(data)
      })
    } else if (text == 'Saved') {
      const query = userSavedPinsQuery(userId);
      client.fetch(query)
      .then((data) => {
        setPins(data)
      })
    }
  }, [text, userId])
  const handleGoogleSignout = () => {
    // const auth = getAuth()
    signOut(auth)
    navigate('/')
    setUser(null);
    console.log('loggedOut successfully')
    // deleteUser()
  }






  if (!user) {
    return <Spinner message='Loading profile...' />
  }
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img src='https://source.unsplash.com/1600x900/?nature,photography,technology'
            className='w-full h-370 2xl:h-510 shadow-lg object-cover'
             alt='banner-pic'/>
            <img 
            className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
            src={user?.image}
            alt='user-pic'
            />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user?.userName}
            </h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              {userId == user._id && (
                <button className='mt-5 bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none' onClick={handleGoogleSignout}><FcGoogle className='mr-4'/>Sign out here</button>
              )}
            </div>
          </div>
          <div className='text-center mb-7 '>
            <button type='button' onClick={(e) => {setText(e.target.textContent); setActiveBtn('created');}} className={`${activeBtn === 'created' ? activeBtnStyles : unActiveBtnStyles}`}>Created</button>
            <button type='button' onClick={(e) => {setText(e.target.textContent); setActiveBtn('saved');}} className={`${activeBtn === 'saved' ? activeBtnStyles : unActiveBtnStyles}`}>Saved</button>
          </div>
          {pins?.length ? (
            <div className='px-2'>
              <MasonryLayout pins={pins}>
                
              </MasonryLayout>
            </div>
          ) : <div className='flex justify-center font-bold items-centerw-full text-xl mt-2'>No pins found!</div>}
        </div>
      </div>
    </div>
  )
}

export default UserProfile

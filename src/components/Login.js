import React, { useState } from 'react'
import {Navigate, useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import video from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { getAuth, signOut, signInWithPopup, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/firebase'
import {createOrGetUser} from '../utils'
import useAuthStore from '../store/authStore'
// import {useNavigte} from 'react-router-dom';
function Login() {
  const {setUser} = useAuthStore();
  
  const {currentUser} = useAuthStore();
  const navigate = useNavigate ();
  // const [user, setUser] = useState('');
  const googleSignIn =  (provider) => {
    // const auth = getAuth()
    signInWithPopup(auth, provider)
    setUser(auth.currentUser)
    // setUser(auth.currentUser)
    // setCurrentUserr(auth?.currentUser)
    createOrGetUser(auth.currentUser)
    const {uid, displayName, photoURL} = auth?.currentUser;
    const user = {
      _id: uid,
      _type: 'user',
      userName: displayName,
      image: photoURL,
  }
    setUser(user)
  }
  
  const handleGoogleSignIn = () => {
    try {
      const provider = new GoogleAuthProvider();
       googleSignIn(provider);
       navigate('/', {replace: true},)
       
    }
    catch(err) {
      console.log(err)
    }
  }
  const handleGoogleSignout = () => {
    // const auth = getAuth()
    signOut(auth);
    console.log('loggedOut successfully')
    // deleteUser()
  }
  return (
    <div className='flex justify-start items-center flex-col h-screen '>
      <div className='relative w-full h-full '>
        <video src={video} type='video/mp4' loops muted autoPlay className='w-full h-full object-cover' />
        <div className='absolute flex flex-col  justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
          <div className='p-5 ' >
            <img src={logo} width='130px' alt='logo'/>
            <button className='mt-5 bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none' onClick={handleGoogleSignIn}><FcGoogle className='mr-4'/>Sign In with Google</button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Login

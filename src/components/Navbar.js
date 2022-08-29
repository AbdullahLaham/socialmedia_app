import React from 'react'
import {IoMdAdd, IoMdSearch} from 'react-icons/io';
import {Link, useNavigate} from 'react-router-dom';
import useAuthStore from '../store/authStore';

function Navbar({user}) {
    const navigate = useNavigate();
    const {searchTerm, setSearchTerm} = useAuthStore();
  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex justify-start gap-5 items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className="ml-1" />
        <form onSubmit={() => navigate('/search')}>
        <input type='text' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} placeholder='Search...'  className='border-none outline-none w-full p-2 bg-white' />
        </form>
      </div>
      <div className='flex gap-3 '>
        <Link to={`user-profile/${user?._id}`} className='hidden md:block' >
          <img src={user?.image} alt='user-image' className='w-14 h-12 rounded-full object-cover ' />
        </Link>
        
        <Link to="/create-pin" className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
          <IoMdAdd />
        </Link>
      </div>
    </div>
  )
}

export default Navbar;

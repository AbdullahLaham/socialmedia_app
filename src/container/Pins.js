import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import {Navbar, Feed, PinDetail, CreatePin, Search} from '../components'
function Pins({user}) {
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-grey-50'>
        <Navbar user={user} />
      </div>
      <div className='h-full '>
        <Routes>
            <Route path='/' element={<Feed />}></Route>
            <Route path='/category/:categoryId' element={<Feed user={user} />}></Route>
            <Route path='pin-detail/:pinId' element={<PinDetail user={user}/>}></Route>
            <Route path='/create-pin' element={<CreatePin user={user} />}></Route>
            <Route path='/search' element={<Search />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default Pins

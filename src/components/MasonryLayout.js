import React from 'react'
import Masonry from 'react-masonry-css';
// import { Pins } from '.';
import Pin from './Pin';
const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 4,
    1200: 3,
    1000: 2,
    500: 1,
}
function MasonryLayout({pins}) {
    console.log(pins, 'sss')
  return (
    <Masonry
    className="flex flex-wrap w-[100%] overflow-hidden animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
        {pins.map(pin => {
        return <Pin key={pin._id} pin={pin} className='w-max' />
      })}
  </Masonry>
  )
}

export default MasonryLayout

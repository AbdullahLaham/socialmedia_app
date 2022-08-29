import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import {urlFor, client} from '../utils/client';
import useAuthStore from '../store/authStore';
function Pin({pin}) {
    const {postedBy, image, _id, destination , save} = pin;
     // e.stopPropagation() will prevent navigation to the route and instead download the image
    const navigate = useNavigate();
    const [isHovered, setHovered] = useState();
    const [savingPost, setSavingPost] = useState();
    const {currentUser} = useAuthStore();
    // let [alreadySaved, setAlreadySaved] = useState(!!(save?.filter(item => item.postedBy?._id === currentUser?._id)?.length));
    console.log('image', image)
    let alreadySaved = !!(save?.filter(item => item.postedBy?._id === currentUser?._id)?.length); // 0 => false , 1 => true
    const savePin = (id) => {
        if (!alreadySaved) {
            setSavingPost(true);
            client.patch(id)
            .setIfMissing({save: []})
            .insert('after', 'save[-1]', [{
                _key: uuidv4(),
                userId: currentUser?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: currentUser?._id,
                }
            }])
            .commit()
            .then(res => {
                console.log('resresresresresresresresresresres0', res)
                setSavingPost(false)
            })

        }
    }
    const deletePin = (id) => {
        client
        .delete(id)
        // .then(() => {
        //     window.
        // })
    }
    // useEffect(() => {
    //     alreadySaved = !!(save?.filter(item => item.postedBy?._id === currentUser?._id)?.length);
    // }, [])
  return (
    <div className='m-2'>
        <div className='relative cursor-zoom-in w-[12rem] hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out' onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => navigate(`/pin-detail/${_id}`)} >
            <img className='rounded-lg w-full h-full' src={image? image?.asset?.url : ''} />
            {isHovered && 
            (
                <div className='absolute top-0 w-full flex justify-between flex-col p-1 pr-2 pt-2 pb-2 z-50 ' style={{height: '100%'}}>
                    <div className=' w-full flex justify-between'>
                        <div className='flex gap-2 '>
                            <a href={`${image?.asset?.url}?dl=`} download onClick={(e) => e.stopPropagation()}  className=''>
                                <MdDownloadForOffline className='bg-red-400 p-.5 text-black  rounded-full flex items-center justify-center text-2xl hover:opacity-100 opacity-75 outline-none' />
                            </a>
                        </div>
                        {save ? 
                        (<button className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>{save?.length} Saved</button>) 
                        : (<button className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none' onClick={(e) => {e.stopPropagation(); savePin(_id);}}>{savingPost ? <p>Saving</p> : <p>save</p>}</button>)
                        }
                    </div>
                    <div className='flex justify-between items-center gap-2 w-full '>
                        
                            <a href={destination} target='_blank' rel='noreferrer' className='flex items-center gap-2 text-black font-bold p-2 px-4 rounded-full opacity-70 hover:100 hover:shadow-md ' >
                                <BsFillArrowUpRightCircleFill />
                                {destination?.length > 20 ? destination?.slice(8, 20) : destination?.slice(8)}
                            </a>
                        
                        {postedBy?._id == currentUser._id && (
                            <button onClick={(e) => {e.stopPropagation(); deletePin(_id) }} className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none'>
                                <AiTwotoneDelete />
                            </button>
                        )}
                    </div>
                </div>
            )}

        </div>
        <Link to={`user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
            <img
            className="w-8 h-8 rounded-full object-cover"
            src={postedBy?.image}
            alt="user-profile"
            />
            <p className="font-semibold capitalize">{postedBy?.userName}</p>
        </Link>
      
    </div>
  )
}

export default Pin

import React, {useState, useEffect} from 'react'
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { client, urlFor } from '../utils/client';
import {MasonryLayout, Spinner} from '../components';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import {feedQuery} from '../utils/data';

function PinDetail({user}) {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  // ID...
  const {pinId} = useParams(); // here we are fetching the params that passed for the route link
  const fetchPinDetail = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        console.log(data);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  }

  const addComment = (e) => {
    setAddingComment(true);
    client.patch(pinId)
    .setIfMissing({comments: []})
    .insert('after', 'comments[-1]', [{
      comment,
      _key: uuidv4(),
      postedBy: {
        _type: 'postedBy',
        _ref: user._id,

      }
    }])
    .commit()
    .then((data) => {
      console.log(data)

      fetchPinDetail();
      setComment('');
      setAddingComment(false);
    })


  }

  useEffect(() => {
    fetchPinDetail();
     
  }, [pinId]);
  console.log('pinspinspins', pins)
  if (!pinDetail) {
    return <Spinner message='Loading Pin... ' />
  }
  return (
    <>
      <div className='flex  flex-col m-auto bg-white ' style={{maxWidth: '1500px', borderRadius: '32px', }}>
      <div className='relative flex justify-center items-center md:items-start flex-initial'>
        <img src={pinDetail?.image && pinDetail.image.asset.url} className='rounded-t-3xl rounded-b-lg h-[20rem] w-[20rem]' alt='user-post' />
          <a href={`${pinDetail?.image?.asset?.url}?dl=`} download onClick={(e) => e.stopPropagation()}  className=''>
            <MdDownloadForOffline className='w-[2.5rem] h-[2.5rem] bg-red-400 p-.5 text-black  rounded-full flex items-center justify-center text-2xl hover:opacity-100 opacity-75 outline-none absolute top-2 rgiht-2'  />
          </a>
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620'>
        <div className=' items-center justify-between '>
          <div className='flex gap-2 items-center'>
            
            {/* <a href={pinDetail?.destination} target='_blank' rel='noreferrer'>{pinDetail?.destination.slice(8, 18)}</a> */}
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {pinDetail.title}
            </h1>
            <p className='mt-3'>{pinDetail?.about}</p>
          </div>
          <Link to={`/user-profile/${pinDetail.postedBy?._id}`} className='hidden md:flex items-center gap-2' >
            <img src={pinDetail.postedBy?.image} alt='user-image' className='w-14 h-14 rounded-full object-cover ' />
            <p className='font-semibold capitalize'>{pinDetail?.postedBy.userName}</p>
        </Link>
        <h2 className='mt-5 text-2xl '>Comments</h2>
        <div className="max-h-370 overflow-y-auto">
          {pinDetail?.comments?.map((item) => (
            <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
              <img
                src={item?.postedBy.image}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt="user-profile"
              />
              <div className="flex flex-col">
                <p className="font-bold">{item.postedBy?.userName}</p>
                <p>{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap items-center mt-6 gap-3'>
            <Link to={`user-profile/${pinDetail?.postedBy?._id}`} className=''>
              <img className='w-8 h-8 rounded-full object-cover cursor-pointer' src={pinDetail.postedBy.image} alt='user-profile' />
            </Link>
            <input className='flex-1 border-grey-100 outline-none border-2 p-2 rounded-2xl focus:border-grey-300 ' type='text' placeholder='Add a comment' value={comment} onChange={(e) => setComment(e.target.value)} />
            <button type='button' className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none ' onClick={addComment}> {addingComment ? 'posting...' : 'Post'} </button>
        </div>

        </div>
      </div>
    </div>
    {pins? <div>
      <h2 className='text-center font-bold text-2xl '>More like this</h2>
      <MasonryLayout pins={pins} ></MasonryLayout>
    </div>: <Spinner message='Loading more pins...' />}
      
    </>
    
  )
}

export default PinDetail

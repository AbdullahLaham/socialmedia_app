import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { categories } from '../utils/data';

import {client} from '../utils/client'
import Spinner from './Spinner'
import axios from 'axios';
function CreatePin({user}) {
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState(false)
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();
const uploadImage = (e) => {
  const {type, name} = e.target.files[0];
  let fileType = type;
  const types = ['JPG', 'JPEG',  'SVG', 'PNG', 'GIF', 'webp']
  types.map(type => {
    if (!fileType.slice(6) == type) {
      setWrongImageType(true);
    } else {
      setWrongImageType(false);
      setLoading(true);
      client.assets
      .upload('image', e.target.files[0], { contentType: fileType, filename: name })
      .then((document) => {
        setImageAsset(document);
        setLoading(false);
      })
      .catch((err) => {
        console.log('image upload error : ', err)
      })

    }

  })
}
const savePin = () => {
  if (imageAsset && title && about && destination ) {
    setLoading(true);
    const document = {
      _type: 'pin',
      // caption,
      title: title,
      about: about,
      destination: destination,
      category: category,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset?._id,
        }
      },
      postedBy: {
        _type: 'postedBy',
        _ref: user?._id,
       },
      userId: user?._id,

    }
    client.create(document).then(res => {
      console.log('resresresresresres', res)
      navigate('/')
    }) 
    .catch(err => console.log(err))

  } else {
    setFields(true);
    setTimeout(() => {
      setFields(false);
    },2000)
  }
}
  return (
    <div className='flex flex-col justify-start items-center -mt-3 lg:h-4/5 bg-gray-200 py-[2.5rem] rounded-lg '>
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in-out '>
          please, fill in all the fields
        </p>
      )}
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full'>
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className='flex justify-center items-center flex-col border-2  border-dotted border-gray-500 p-5 w-full h-420'>
            {loading && <Spinner />}
            {wrongImageType && <p>wrong image type</p>}
            {!imageAsset ? (
              <label>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col items-center justify-center'>
                    <p className='font-bold text-2xl '>
                      <AiOutlineCloudUpload  />
                      
                    </p>
                    <p className='text-lg'>
                        Click to Upload
                    </p>
                    <p className="mt-32 text-gray-400">
                      Use high-quality JPG, SVG, PNG, GIF less than 20MB
                    </p>
                  </div>
                  <input type='file' name='upload-image' className='h-0 w-0' onChange={uploadImage}  />
                </div>
              </label>
            ) : <div className='flex flex-col justify-between'>
                  <img src={imageAsset?.url} alt='uploaded-pic' className='h-full w-full' />
                  <button  type='button' onClick={() => setImageAsset(null)} className='absolute bottom-14 w-[2.7rem] p-3 rounded-full bg-black text-red-400 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out '>
                    <MdDelete className='flex'/>
                  </button>
              </div>}
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='add your title here...' className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2 pl-5' />
              {user && (
                <div className='flex gap-2 my-2 items-center bg-white rounded-lg '>
                  <img 
                  src={user?.image}
                  className='w-10 h-10 rounded-full'
                  alt='user-profile'
                  />
                  <p className='font-bold'>{user?.userName}</p>
                </div>
              )}
              <input type='text' value={about} onChange={(e) => setAbout(e.target.value)} placeholder='what is your pin about...' className='outline-none sm:text-lg text-base border-b-2 border-gray-200 p-2 pl-5' />
              <input type='text' value={destination} onChange={(e) => setDestination(e.target.value)} placeholder='add the image destination link' className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2 pl-5' />
              <div className='flex flex-col'>
                <div>
                  <p className=' mb-2 font-semibold text-lg sm:text-xl '>choose a pin category</p>
                  <select onChange={(e) => setCategory(e.target.value)} className='outline-none w-4/5 text-base border-b-2 border-grey-200 p-2 rounded-md cursor-pointer'>
                      <option value='other' className='sm:text-bg bg-white' >
                        Select category
                      </option>
                      {categories.map((category) => {
                        return <option className='text-base border-0 outline-none capitalize bg-white text-black '>
                          {category?.name}
                        </option>
                      })}
                  </select>
                </div>
                <div className="flex justify-end items-end mt-5">
                  <button
                    type="button"
                    onClick={savePin}
                    className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                  >
                    Save Pin
                  </button>
            </div>
              </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin

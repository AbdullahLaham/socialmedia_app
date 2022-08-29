import React, {useState, useEffect} from 'react'

import {MasonryLayout, Spinner} from '../components';
import { client } from '../utils/client';
import { feedQuery, searchQuery } from '../utils/data';
import useAuthStore from '../store/authStore'
function Search() {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);
  const {searchTerm, setSearchTerm} = useAuthStore();
  useEffect(() => {
    let query = '';
    if (searchTerm) {
      setLoading(true)
      query = searchQuery(searchTerm);
      console.log('searchTerm', searchTerm)
    } 
    else {
      query = feedQuery;
    }
    client.fetch(query)
      .then(data => {
        setPins(data);
        setLoading(false);
        console.log('pins', data)
      })
  }, []);
  return (
    <div>
      {loading && <Spinner message='Searching for pins' />}
      {pins?.length > 0 ? <MasonryLayout pins={pins}></MasonryLayout>: (searchTerm !== '' &&  !loading && 
      (<p className='mt-10 text-center text-xl'>the Result Not found!</p>))}
    </div>
  )
}

export default Search

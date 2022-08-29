import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {client} from '../utils/client';
import { searchQuery, feedQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';

import Spinner from './Spinner';
function Feed() {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState([]);
  const {categoryId} = useParams();
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      
        const query = searchQuery(categoryId);
        client.fetch(query).then((data) => {
          setLoading(false);
          setPins(data)
          console.log('dataaaaaaa', data)
        });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  console.log(pins, 'ffffff')

  
  return (
    <div>
      {loading ? (<Spinner message='we are adding new ideas to your feed!' />) : 
      (<div>
        <MasonryLayout pins={pins} />
      </div>)}
    </div>
  )
}

export default Feed

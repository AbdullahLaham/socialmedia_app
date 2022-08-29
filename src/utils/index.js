import {client} from './client';
import useAuthStore from '../store/authStore';
export const createOrGetUser = async (userData) => {
    const {uid, displayName, photoURL} = userData;
    const user = {
        _id: uid,
        _type: 'user',
        userName: displayName,
        image: photoURL,
    }
    await client.createIfNotExists(user)
    .then((response) => {
        console.log('data', response)
    })
    .catch(err => {
        console.log('err',err)
    })
}
import {atom, atomFamily, selector, selectorFamily} from 'recoil';
import { SERVER_URL, SERVER_PORT } from '../../../.moon.config.mjs';

const userState = atom({
    key: 'userState',
    default: '',
})

const refreshState =atomFamily({
    key: 'refreshState',
    default: (username) => false
})

const profileState =atomFamily({
    key: 'profileState',
    default: selectorFamily({
        key: 'userProfileState',
        get: (username) => async ({get}) =>{
            get(refreshState(username))
            if(!username.length) return {data:{profilePic: '', username: '', posts: 0, followers: 0, followings: 0}};
            const data= await fetch(SERVER_URL+":"+SERVER_PORT+"/user/"+username)
            if(!data.ok) throw new Error("Failed to fetch data");       
            const json = await data.json();
            // console.log("fetched", json);
            return json;
        }
    })
})



export {userState, refreshState ,profileState}
import {atom, atomFamily, selector, selectorFamily} from 'recoil';
import { SERVER_URL, SERVER_PORT } from '../../../.moon.config.mjs';

const userState = atom({
    key: 'userState',
    default: '',
})

const refreshState =atomFamily({
    key: 'refreshState',
    default: (username) => 0
})

const othersState =atom({
    key: 'othersState',
    default: ''
})

const profileState =atomFamily({
    key: 'profileState',
    default: selectorFamily({
        key: 'userProfileState',
        get: (username) => async ({get}) =>{
            console.log("profile state", username)
            get(refreshState(username))
            get(refreshState(userState))
            if(!username.length) return {data:{profilePic: '', username: '', posts: 0, followers: 0, followings: 0}};
            const data= await fetch(SERVER_URL+":"+SERVER_PORT+"/user/"+username)
            if(!data.ok) {console.log(data);throw new Error("Failed to fetch data")};       
            const json = await data.json();
            return json;
        }
    })
})

const othersListState= atomFamily({
    key: 'othersListState',
    default: selectorFamily({
        key: 'othersListState',
        get: (params) => async ({get}) =>{
            const { username, others } = params;
            get(refreshState(username))
            console.log("othersListState", username,others);
            if(!others) return {data:[]}
            const data= await fetch(SERVER_URL+":"+SERVER_PORT+"/user/"+username+"/"+others)
            console.log(data)
            if(!data.ok) {console.log(data); throw new Error("Failed to fetch data")};       
            const json = await data.json();
            return json;
        }
    })

})

export {userState, othersState ,refreshState ,profileState ,othersListState}
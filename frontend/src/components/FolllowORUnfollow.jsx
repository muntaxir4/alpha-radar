import { useState , useEffect} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { refreshState, userState } from "../store/atoms";
import { SERVER_PORT, SERVER_URL } from "../../../.moon.config.mjs";


function FolllowORUnfollow({diffUser, isFollowed}){
    const [followed, setFollowed] = useState(isFollowed);
    // console.log("isFollowed", diffUser, isFollowed , followed)
    const username = useRecoilValue(userState);
    const setRefresh=useSetRecoilState(refreshState(diffUser))

    async function handleFollowed(){
        const endpoint = followed? "unfollow": "follow";
        const data =await fetch(SERVER_URL+":"+SERVER_PORT+`/user/${username}/${endpoint}/${diffUser}`, {method: "POST"});
        setFollowed( prev=>!prev)
        setRefresh(prev=>!prev);
        // console.log(data);
    }

    return (
        <div>
            {!followed && <button className="bg-sky-400 h-min p-1 self-center rounded-md text-sm" onClick={handleFollowed}>Follow</button>}
            {followed && <button className="bg-slate-400 h-min p-1 self-center rounded-md text-sm" onClick={handleFollowed}>Unfollow</button>}
        </div>
        
    )
}

export default FolllowORUnfollow;
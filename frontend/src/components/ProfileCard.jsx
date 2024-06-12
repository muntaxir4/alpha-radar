import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { userState,refreshState,profileState,othersState } from "../store/atoms";

import Loading from "./Loading";

function ProfileCard(){
    const username = useRecoilValue(userState);
    const userData =useRecoilValueLoadable(profileState(username));
    const setIsRefresh= useSetRecoilState(refreshState(username));
    const setOthers = useSetRecoilState(othersState);

    if(userData.state === 'loading') return <div className="m-2 flex justify-center"> <Loading /></div>;
    else if(userData.state === 'hasError') return <div>User Not found</div>;
    const userProfile = userData.contents.data;
    return (
        <div className="border border-black rounded-xl m-3 p-5 h-full flex flex-col justify-between
        animated-background bg-gradient-to-r from-sky-300 via-blue-500 to-indigo-600">
           <button type="button" className="absolute" onClick={()=> setIsRefresh(b=>b+1)}>🔄</button>
           <img src={userProfile.profilePic || "./src/assets/user.png"} alt="ProfilePic" width="100px" className="self-center"/>
            <h1 className="text-xl font-sans font-semibold">{userProfile.username || "Username"}</h1>
            <div className="flex justify-around  ">
                <div className="hover:bg-gray-200 rounded-md">
                    <p>Posts</p>
                    <p>{userProfile.posts}</p>
                </div>
                <div className="hover:bg-gray-200 rounded-md" onClick={()=>setOthers("followers")}>
                    <p >Followers</p>
                    <p>{userProfile.followers}</p>
                </div>
                <div className="hover:bg-gray-200 rounded-md" onClick={()=>setOthers("followings")}>
                    <p  >Followings</p>
                    <p>{userProfile.followings}</p>
                </div>
                <div className="hover:bg-gray-200 rounded-md self-center" onClick={()=>setOthers("findothers")}>
                    <p  >Find</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;
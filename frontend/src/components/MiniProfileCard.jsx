import { useRecoilValueLoadable } from "recoil";
import Loading from "./Loading";
import { profileState } from "../store/atoms";

function MiniProfileCard({diffUser}){
    console.log("diffUser", diffUser)
    const diffUserProfile= useRecoilValueLoadable(profileState(diffUser));
    if(diffUserProfile.state === "loading"){
        return <Loading />
    }
    else if(diffUserProfile.state === "hasError"){
        return <div>Error: {diffUserProfile.contents}</div>
    }
    const diffUserProfileData = diffUserProfile.contents.data;
    console.log("diffUserProfileData", diffUserProfileData)
    return (
        <div className="flex justify-around border border-1 rounded-md backdrop-blur-sm p-2 gap-2 m-2 "> 
            <img src={ diffUserProfileData.profilePic || "./src/assets/user.png"} alt="Small DP" className="h-10 self-center"/>
            <p className="self-center">{diffUserProfileData.username || "username"}</p>
            <div className="self-center">
                <p>{diffUserProfileData.followers}</p>
                <p className="text-xs" >Followers</p>
            </div>
            <button className="bg-sky-400 h-min p-1 self-center rounded-md text-sm">Follow</button>
        </div>
    )
}

export default MiniProfileCard;
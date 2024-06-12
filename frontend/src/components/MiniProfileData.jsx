import { useRecoilValueLoadable } from "recoil";
import Loading from "./Loading";
import { profileState } from "../store/atoms";

function MiniProfileData({diffUser}){
    // console.log("diffUser", diffUser)
    const diffUserProfile= useRecoilValueLoadable(profileState(diffUser));
    if(diffUserProfile.state === "loading"){
        return <div className="m-2 flex justify-center"> <Loading /></div>
    }
    else if(diffUserProfile.state === "hasError"){
        return <div>Error: {diffUserProfile.contents}</div>
    }
    const diffUserProfileData = diffUserProfile.contents.data;

    // console.log("diffUserProfileData", diffUserProfileData)


    return (
        <>
            <img src={ diffUserProfileData.profilePic || "./src/assets/user.png"} alt="Small DP" className="h-10 self-center"/>
            <p className="self-center">{diffUserProfileData.username || "username"}</p>
            <div className="self-center">
                <p>{diffUserProfileData.followers}</p>
                <p className="text-xs" >Followers</p>
            </div>
        </>
    )
}

export default MiniProfileData;
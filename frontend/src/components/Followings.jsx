import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { userState, othersListState } from "../store/atoms";
import Loading from "./Loading";
import MiniProfileCard from "./MiniProfileCard";
import MiniProfileData from "./MiniProfileData";
import FolllowORUnfollow from "./FolllowORUnfollow";


function Followings(){
    const username = useRecoilValue(userState);
    const followingsQuery =useRecoilValueLoadable(othersListState({username, others: "followings"}));
    if(followingsQuery.state === "loading"){
        return <div className="m-2 flex justify-center"> <Loading /></div>
    }
    else if(followingsQuery.state === "hasError"){
        console.log(followingsQuery.contents)
        return <div>Error in followings</div>
    }
    const followingsList = followingsQuery.contents.data;
    return (<div>
        {followingsList.map((diffUser, index) => 
        <MiniProfileCard key={index}>
            <MiniProfileData diffUser={diffUser}/>
            <FolllowORUnfollow diffUser={diffUser} isFollowed={true}/>
        </MiniProfileCard>
        )}
    </div>)
}

export default Followings;
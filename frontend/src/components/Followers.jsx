import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { userState, othersListState } from "../store/atoms";
import Loading from "./Loading";
import MiniProfileData from "./MiniProfileData";
import MiniProfileCard from "./MiniProfileCard";

function Followers(){
    const username = useRecoilValue(userState);
    const followersQuery =useRecoilValueLoadable(othersListState({username, others: "followers"}));
    if(followersQuery.state === "loading"){
        return <div className="m-2 flex justify-center"> <Loading /></div>
    }
    else if(followersQuery.state === "hasError"){
        console.log(followersQuery.contents)
        return <div>Error in Followers</div>
    }
    const followersList = followersQuery.contents.data;
    return (<div>
        {followersList.map((diffUser, index) => 
            <MiniProfileCard key={index} >
                <MiniProfileData diffUser={diffUser} />
            </MiniProfileCard>
        )}
    </div>)
}

export default Followers;
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { userState, othersListState } from "../store/atoms";
import Loading from "./Loading";
import MiniProfileData from "./MiniProfileData";
import MiniProfileCard from "./MiniProfileCard";
import FolllowORUnfollow from "./FolllowORUnfollow";


function FindOthers(){
    const username = useRecoilValue(userState);
    const findOthersQuery =useRecoilValueLoadable(othersListState({username, others: "findothers"}));
    if(findOthersQuery.state === "loading"){
        return <div className="m-2 flex justify-center"> <Loading /></div>
    }
    else if(findOthersQuery.state === "hasError"){
        console.log(findOthersQuery.contents)
        return <div>Error in findOthers</div>
    }
    const findOthersList = findOthersQuery.contents.data;
    return (<div>
        {findOthersList.map((diffUser, index) => 
            <MiniProfileCard key={index} >
                <MiniProfileData diffUser={diffUser}/>
                <FolllowORUnfollow diffUser={diffUser} isFollowed={false}/>
            </MiniProfileCard>
        )}
    </div>)
}

export default FindOthers;
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { userState, othersListState } from "../store/atoms";
import Loading from "./Loading";
import MiniProfileCard from "./MiniProfileCard";



function Followings(){
    const username = useRecoilValue(userState);
    const followingsQuery =useRecoilValueLoadable(othersListState({username, others: "followings"}));
    if(followingsQuery.state === "loading"){
        return <Loading />
    }
    else if(followingsQuery.state === "hasError"){
        console.log(followingsQuery.contents)
        return <div>Error in followings</div>
    }
    const followingsList = followingsQuery.contents.data;
    return (<div>
        {followingsList.map((diffUser, index) => 
            <MiniProfileCard key={index} diffUser={diffUser}/>
        )}
    </div>)
}

export default Followings;
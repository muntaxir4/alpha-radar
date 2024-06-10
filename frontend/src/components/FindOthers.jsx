import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { userState, othersListState } from "../store/atoms";
import Loading from "./Loading";
import MiniProfileCard from "./MiniProfileCard";



function FindOthers(){
    const username = useRecoilValue(userState);
    const findOthersQuery =useRecoilValueLoadable(othersListState({username, others: "findothers"}));
    if(findOthersQuery.state === "loading"){
        return <Loading />
    }
    else if(findOthersQuery.state === "hasError"){
        console.log(findOthersQuery.contents)
        return <div>Error in findOthers</div>
    }
    const findOthersList = findOthersQuery.contents.data;
    return (<div>
        {findOthersList.map((diffUser, index) => 
            <MiniProfileCard key={index} diffUser={diffUser}/>
        )}
    </div>)
}

export default FindOthers;
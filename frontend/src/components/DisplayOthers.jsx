import { useRecoilValue } from "recoil";
import { othersState, userState } from "../store/atoms";
import Followers from "./Followers";
import Followings from "./Followings";
import FindOthers from "./FindOthers";

function DisplayOthers(){
    const others=useRecoilValue(othersState);
    console.log("others", others)
    return (
        <div>
            {others == "followers" && <Followers />}
            {others == "followings" && <Followings />}
            {others == "findothers" && <FindOthers />}
        </div>
    )
}

export default DisplayOthers;
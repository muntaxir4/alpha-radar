
import Search from "./Search"
import ProfileCard from "./ProfileCard"
import DisplayOthers from "./DisplayOthers";
import Tilt from "react-parallax-tilt";

function App() {

  return <div className="text-center">
    <h1 className="text-3xl font-bold m-4 underline">Alpha Radar</h1>
    <Search />   
    <Tilt>
      <div className="w-[90%] sm:max-w-[40%] h-96 mx-auto">
        <ProfileCard />
      </div>
    </Tilt>
    <div className="flex flex-col w-11/12 sm:w-3/4 mx-auto">
     <DisplayOthers />
    </div>
  </div>
}

export default App;

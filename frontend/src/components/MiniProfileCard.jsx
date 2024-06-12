
function MiniProfileCard({children}){
    return (

       <div className="flex justify-around border border-1 rounded-md backdrop-blur-sm p-2 gap-2 m-2 ">  
            {children}
        </div>

    )
}

export default MiniProfileCard;
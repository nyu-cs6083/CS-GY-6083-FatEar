import { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import FriendService from "../services/friend.service";


const FriendRequestModal = (props) => {
    const [friendRequests, setFriendRequests] = useState([])

    useEffect(async()=>{

        const listOfFriendRequests = await FriendService.getFriendRequests()
        setFriendRequests(listOfFriendRequests)

    },[])


    const handleAcceptFriend = async (username) => {
      await FriendService.acceptFriend({username})
      if(friendRequests.length > 0){
        setFriendRequests(friendRequests.filter((request)=>request.username !== username))
      }
    }

    const handleDeclineFriend = async (username) => {
        await FriendService.declineFriend({username})
        if(friendRequests.length > 0){
            setFriendRequests(friendRequests.filter((request)=>request.username !== username))
          }
      }


    const {setShowFriendRequestModal} = props
    return <div style={{left: '60%', top: '8%',height: '400px',width: '517px', zIndex: 5, position:'fixed', backgroundColor: 'ghostwhite', border: '1px solid black'}}>
<div style={{display: 'flex', justifyContent: 'space-between'}}>
    <h5>Friend Requests</h5>
    <button onClick={()=>setShowFriendRequestModal(false)}><FontAwesomeIcon icon={faClose} /></button>
</div>
<div id={'FriendRequests'}>
            {friendRequests && friendRequests.map((listOfFriendRequests)=>{
                    return(
                        <div>
                            <p>Name: {listOfFriendRequests.fname} {listOfFriendRequests.lname}</p>
                            <p>Email: {listOfFriendRequests.email}</p>
                            <p>Requested on: {listOfFriendRequests.createdAt.slice(0,10)}</p>
                            <button onClick={()=>handleAcceptFriend(listOfFriendRequests.username)}>Accept</button>
                            <button onClick={()=>handleDeclineFriend(listOfFriendRequests.username)}>Decline</button>
                        </div>
                    )
                })}
    </div>
    </div>
}

export default FriendRequestModal;
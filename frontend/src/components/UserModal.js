import RatingService from "../services/rating.service";
import {useEffect, useState} from "react";
import FriendService from "../services/friend.service";
import FollowService from "../services/follow.service";
import PeopleService from "../services/people.service";
import {isEmpty} from "lodash";

export const UserModal = (props) => {
    const {setShowUserModal, user} = props

    const [userProfile, setUserProfile] = useState(undefined)
    const [favoriteSongs, setFavoriteSongs] = useState([])
    const [userFollows, setUserFollows] = useState(0)

    useEffect(async()=>{
        const userProfileWithFriends = await PeopleService.getProfile(user.username)
         if (!userProfileWithFriends){
             setUserProfile(user)
         }else{
             setUserProfile(userProfileWithFriends)
         }
         setFavoriteSongs(await PeopleService.getFavoriteSongs(user.username))
        const userFollows = await PeopleService.getUserFollows(user.username)
        setUserFollows(userFollows.length)
    },[])

    return (
        <div style={{
            left: 0,
            top: 0,
            position: 'fixed',
            width: '100%',
            height: '100%',
            zIndex: 1,
            backgroundColor: 'lightblue',
            opacity: '97%',
            overflow: 'auto'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '15%',
                marginTop: '8%',
                marginLeft: '10%',
                backgroundColor: 'cornflowerblue',
                height: '50%',
                width: '80%',
                padding: '20px'
            }}>
                <div style={{display: 'flex', height: '80%', marginBottom: '1rem'}}>
                    <div style={{
                        display: 'flex',
                        width: '50%',
                        flexDirection: 'column',
                        backgroundColor: 'whitesmoke',
                        border: '2px solid cornflowerblue',
                        padding: '1rem'
                    }}>
                        <h4>User Details</h4>
                        {userProfile && <div style={{display: 'flex', flexDirection: 'column'}}>
                            <span>Name: {userProfile.fname + ' ' + userProfile.lname}</span>
                            <span>Profile: {userProfile.userProfile}</span>
                            <span>
                                {userProfile.numFriends ?? 0} Friends
                            </span>
                            <span>
                                {userProfile.numFollowers ?? 0} Followers
                            </span>
                            <span>
                                {userFollows} Following
                            </span>
                        </div>}
                        <div style={{marginTop: '8px'}}>
                            <button onClick={async()=>{
                                try{
                                     const res = await FriendService.inviteFriend({username: user.username})
                                    alert('Friend Requested')
                                }catch (e) {
                                    alert(e.response.data.error.info)
                                }

                            }}>Friend</button>
                            <button onClick={async()=>{ try{
                                await FollowService.postFollow({username: user.username})
                                alert('Followed')
                            }catch (e) {
                                alert(e.response.data.error.info)
                            }}}>Follow</button>
                        </div>

                    </div>
                    <div style={{
                        display: 'flex',
                        width: '50%',
                        flexDirection: 'column',
                        backgroundColor: 'whitesmoke',
                        border: '2px solid cornflowerblue',
                        padding: '1rem'
                    }}>
                        <h4>Favorite Songs</h4>
                        {!isEmpty(favoriteSongs) ? favoriteSongs.map((song)=>{
                            return <span>{song.title} by {song.artistFname} {song.artistlname}</span>
                        }): <span>This user does not have favorite songs yet</span>}

                    </div>

                </div>

                <button style={{marginLeft: '90%', width: '6rem'}} onClick={() => {
                    setShowUserModal(false)
                }}>Close
                </button>

            </div>
        </div>
    )
}
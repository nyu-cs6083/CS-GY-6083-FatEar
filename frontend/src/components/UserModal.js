import RatingService from "../services/rating.service";
import {useEffect, useState} from "react";
import FriendService from "../services/friend.service";
import FollowService from "../services/follow.service";

export const UserModal = (props) => {
    const {setShowUserModal, user} = props
    // useEffect(async()=>{
    //
    // },[])
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
                height: '80%',
                width: '80%',
                padding: '20px'
            }}>
                <div style={{display: 'flex', height: '90%', marginBottom: '1rem'}}>
                    <div style={{
                        display: 'flex',
                        width: '50%',
                        flexDirection: 'column',
                        backgroundColor: 'whitesmoke',
                        border: '2px solid cornflowerblue',
                        padding: '1rem'
                    }}>
                        <h4>User Details</h4>
                        <span>Name: {user.fname + ' ' + user.lname}</span>
                        <span>Profile: {user.userProfile}</span>
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
                                const res = await FollowService.postFollow({username: user.username})
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
                        <h4>User Details</h4>
                        {/*<span>Title: {song.title}</span>*/}
                        {/*<span>Artist Name: {song.fname + ' ' + song.lname}</span>*/}
                        {/*<span>Release Date: {song.releaseDate.slice(0,10)}</span>*/}
                        {/*<span>Song URL: <a href={song.songURL}>Listen</a></span>*/}
                        {/*<span>Artist URL: <a href={song.artistURL}>Learn More</a></span>*/}
                        {/*Need to get song rating for this song*/}

                        {/*Nigel: frontend trigger for rating a song and reviewing a song*/}
                        {/* treat the rate button as a front end trigger and add an input box next to it that*/}
                        {/* the rate button sends the value from to the backend.*/}
                        <div>
                            <button onClick={()=>{}}>Friend</button>
                        </div>

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
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllFriends, setAllFriendRequests } from "../store/friends/index"
import "./Friends.css"
const API_LINK = process.env.REACT_APP_API_LINK;

// const friends =[
//     { id: 1, name: 'Ahmed', avatar: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp' },
//     { id: 2, name: 'Mousa', avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHY-qr_BcQu96DbQ-hfH_vhV3YQUdeXgvCD0QtmND-BfTt-6tzyJLNcWMZy1PB8TIiVko&usqp=CAU" },
//     { id: 3, name: 'Khaled', avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" }
//   ];
const Friends = () => {
    const dispatch = useDispatch()
    const friends = useSelector((state) => state.friends.allFriends);
    const friendRequests = useSelector((state) => state.friends.friendRequests);
console.log(friends)

    const getAllFriends = async () => {
        const id = localStorage.getItem("userId")
        console.log(id)
        try {
            const response = await axios.get(`${API_LINK}/friends/${id}`)
            dispatch(setAllFriends(response.data.connection))
            console.log(response.data.connection)
        } catch (err) {
            console.log(err)
        }

    }

    const getAllFriendRequests = async()=>{
        const id =localStorage.getItem("userId")
        try{
            const response = await axios.get(`${API_LINK}/friends/requests/${id}`)
            dispatch(setAllFriendRequests(response.data.connection))
            console.log(response.data.connection)
        }catch(err){
            console.log(err)
        }
    }

    const deleteFriend = async()=>{
        const id = localStorage.getItem("userId")
        try{
            const response = await axios.get(`${API_LINK}/friends/delete/${id}`)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        getAllFriends()
        getAllFriendRequests()
    }, [])

    return (
        <div className="friend-list">
        {friends.map((friend) => (
          <div className="friend" key={friend.id}>
            <img className="friend-avatar" src={friend.user_image} />
            <div className="friend-info">
              <div className="friend-name">{friend.first_name  } {friend.last_name}</div>
              <div className="friend-options">
                <div className="friend-message">Message</div>
                <div className="friend-delete">Delete</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    
}


export default Friends

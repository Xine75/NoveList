import { React, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FriendContext } from "../Providers/FriendProvider";
import { FriendCard } from "./FriendCard";
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import "./Friend.css"

//Friend List will be responsible for rendering a list of the current user's friends

export const FriendList = () => {
    const history = useHistory();
    const { friends, getAllFriends } = useContext(FriendContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile")).id;

    //------- get Friends---------------------

    useEffect(() => {
        getAllFriends()
    }, [])

    //--------------FILTER friends for those belonging to current user, then feed each object in the array into BookCard
    return friends ? (
        <>
            <div className="friends">
                <div className="friend__list__header">
                    <h3>My Friends</h3>
                    <Button className="find__friends__btn" variant="info" className="find_friends_btn" onClick={() => { history.push(`/api/friend/search`) }}>Find Friends</Button>
                </div>
                <Table className="friend__table" striped bordered hover size="sm">
                    <thead>
                        <tr>

                            <th></th>
                            <th>UserName</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody className="friends">
                        {
                            friends.filter(f => f.userId === currentUser).map(friend => {
                                return <FriendCard key={friend.id} friend={friend} />
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </>
    ) : null;
}
export default FriendList;

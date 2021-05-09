import { React, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BookContext } from "../Providers/BookProvider";
import { BookCard } from "./BookCard";
import Table from "react-bootstrap/Table"
import { FriendContext } from '../Providers/FriendProvider';

//Friend List will be responsible for rendering a list of the current user's friends

export const FriendList = () => {

    const { friends, getAllFriends } = useContext(FriendContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile")).id;

    //------- get Friends---------------------

    useEffect(() => {
        getAllFriends()
    }, [])

    //--------------FILTER friends for those belonging to current user, then feed each object in the array into BookCard
    return friends ? (
        <>

            <h3>My Friends</h3>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>

                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>UserName</th>
                        <th></th>
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
        </>
    ) : null;
}
export default FriendList;

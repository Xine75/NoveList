import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { FriendContext } from "../Providers/FriendProvider";
import Button from "react-bootstrap/Button";


export const FriendCard = ({ friend }) => {
    const { getAllFriends, deleteFriend } = useContext(FriendContext);
    const history = useHistory();



    //-----------------HANDLE DELETE --------------------

    const handleDelete = () => {
        deleteFriend(friend.id)
            .then(() => {
                history.push("/friend")

            }).then(getAllFriends)
    }
    //------------------JSX for Friend Card and Find Friend Modal -------------------------

    return (
        <>

            <tr>
                <td><i class="fas fa-book-reader"></i></td>
                <td>{friend.friendInfo.userName}</td>
                <td>{friend.friendInfo.firstName}</td>
                <td>{friend.friendInfo.lastName}</td>
                <td><Button size="sm" onClick={handleDelete}>Remove Friend</Button></td>
            </tr>
        </>
    )
}

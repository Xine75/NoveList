import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FriendContext } from "../Providers/FriendProvider";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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

    //------------------JSX for Book Card -------------------------
    return (
        <>

            <tr>
                <td>{friend.friendInfo.firstName}</td>
                <td>{friend.friendInfo.lastName}</td>
                <td>{friend.friendInfo.userName}</td>
                <td><Button onClick={handleDelete}>Remove Friend</Button></td>
            </tr>


        </>
    )
}
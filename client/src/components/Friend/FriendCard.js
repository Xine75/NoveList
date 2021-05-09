import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { FriendContext } from "../Providers/FriendProvider";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const FriendCard = ({ friend }) => {
    const { getAllFriends, deleteFriend, searchUsers } = useContext(FriendContext);
    const [searchName, setSearchName] = useState("");
    const history = useHistory();

    //--------------Setting up modal------------------
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //-----------------HANDLE DELETE --------------------

    const handleDelete = () => {
        deleteFriend(friend.id)

            .then(() => {
                history.push("/friend")

            }).then(getAllFriends)
    }

    //------------search for friends method---------------

    const searchSubmit = (e) => {
        e.preventDefault();
        searchUsers(searchName)
        //.then(() => history.push(`/search/${searchName}`))
    }

    //------------------JSX for Friend Card and Find Friend Modal -------------------------
    return (
        <>

            <tr>
                <td>{friend.friendInfo.firstName}</td>
                <td>{friend.friendInfo.lastName}</td>
                <td>{friend.friendInfo.userName}</td>
                <td><Button onClick={handleDelete}>Remove Friend</Button></td>
            </tr>

            <br />


            <Button variant="info" className="find_friends_btn" onClick={handleShow}>Find Friends</Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Find a Friend</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <input type="text" className="input--wide" value={searchName}

                        onChange={e => setSearchName(e.target.value)} placeholder="Name or UserName" />
                    <Button onClick={searchSubmit}>Search</Button>

                    {/* <FriendSearch /> */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" >Add</Button>
                </Modal.Footer>
            </Modal>



        </>
    )
}

import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { FriendContext } from "../Providers/FriendProvider";
import { Button } from 'react-bootstrap'
import FriendSearchList from "./FriendSearchList";


//------------search for friends method---------------

export const FriendSearch = () => {

    const [searchName, setSearchName] = useState("");
    const { searchUsers } = useContext(FriendContext);
    const history = useHistory();


    const searchSubmit = (e) => {
        e.preventDefault();
        searchUsers(searchName)
            .then(() => history.push(`/api/friend/search/${searchName}`))
    }

    return (
        <>
            <h4>Find a Friend</h4>

            <input type="text" className="input--wide" value={searchName}

                onChange={e => setSearchName(e.target.value)} placeholder="Name or UserName" />
            <Button onClick={searchSubmit}>Search</Button>

        </>
    )
};
export default FriendSearch;
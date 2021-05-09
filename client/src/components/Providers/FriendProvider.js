import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const FriendContext = createContext();

export function FriendProvider(props) {
    const apiUrl = "/api/friend";
    const { getToken } = useContext(UserProfileContext);
    const [friend, setFriend] = useState();
    const [friends, setFriends] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const addFriend = friendObj => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(friendObj)
            })
        );
    };
    const deleteFriend = (friendId) => {
        return getToken()
            .then((token) =>
                fetch(`${apiUrl}/${friendId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            )
    };

    const searchUsers = (searchTerms) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/searchq=${searchTerms}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setSearchResult)
        )
    };
    const getAllFriends = () => {
        //the proxy that was set up in package.json will be handling the first part of the URL
        return getToken()
            .then((token) =>
                fetch(`${apiUrl}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => res.json())
            )
            .then(setFriends);
    };
    const getFriendsByBookId = (googleApiId) => {
        //the proxy that was set up in package.json will be handling the first part of the URL
        return getToken()
            .then((token) =>
                fetch(`${apiUrl}/${googleApiId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => res.json())
            )
    };
    return (
        <FriendContext.Provider
            value={{
                friend, friends,
                setFriend, setFriends,
                addFriend, deleteFriend,
                searchUsers, getAllFriends, getFriendsByBookId
            }}
        >
            {props.children}
        </FriendContext.Provider>
    );

}
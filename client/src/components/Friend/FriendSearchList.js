import { React, useContext } from 'react';
import { FriendContext } from "../Providers/FriendProvider";
import { FriendSearchCard } from "./FriendSearchCard";

//SearchList will be responsible rendering the search results to
//the DOM

export const FriendSearchList = () => {
    const { friendSearchResult } = useContext(FriendContext);

    //----feed each object in the searchResult array into the FriendSearchCard------

    return (
        <>
            <h4>Results:</h4>
            <div className="friendSearchResult">
                {friendSearchResult.map(friendSearchResult => {
                    return <FriendSearchCard key={friendSearchResult.id} friendSearchResult={friendSearchResult} />
                })}
            </div>
        </>
    );
};
export default FriendSearchList;
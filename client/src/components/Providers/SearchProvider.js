import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [searchResult, setSearchResult] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");
    debugger
    const Search = (searchTerms) => {
        return getToken().then((token) =>
            fetch(`/api/book/search/${searchTerms}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setSearchResult)
        )
    };

    return (
        <SearchContext.Provider
            value={{ searchTerms, setSearchTerms, searchResult, setSearchResult, Search }}
        >
            {props.children}
        </SearchContext.Provider>
    );
};
export default SearchProvider;
import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SearchContext = createContext();

export function SearchProvider(props) {
    const { getToken } = useContext(UserProfileContext);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");

    const Search = (searchTerms) => {
        return getToken().then((token) =>
            fetch(`search/${searchTerms}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setSearchResults)
        )
    };

    return (
        <SearchContext.Provider
            value={{ searchTerms, setSearchTerms, searchResults, setSearchResults, Search }}
        >
            {props.children}
        </SearchContext.Provider>
    );
};
export default SearchProvider;
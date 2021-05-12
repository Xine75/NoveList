import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [searchResult, setSearchResult] = useState([]);
    const [searchSuccess, setSearchSuccess] = useState(true)
    const [searchTerms, setSearchTerms] = useState("");

    const Search = (searchTerms) => {
        return getToken().then((token) =>
            fetch(`/api/book/search/${searchTerms}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then((searchResult) => {
                    if (searchResult.status === 404) {
                        setSearchSuccess(false)
                        setSearchResult([])
                    } else {
                        setSearchResult(searchResult)
                        setSearchSuccess(true)
                    }

                })
        )
    };
    return (
        <SearchContext.Provider
            value={{ searchTerms, setSearchTerms, searchResult, setSearchResult, Search, searchSuccess }}
        >
            {props.children}
        </SearchContext.Provider>
    );
};
export default SearchProvider;
import React, { useContext, useState } from "react";
import { SearchContext } from "../Providers/SearchProvider";

export const GoogleSearch = () => {
    const { searchTerms, setSearchTerms, searchResults, setSearchResults } = useContext(SearchContext);

    return (
        <>
            Search for a Book:
            <input type="text" className="input--wide"
                onKeyUp={(e) => setSearchTerms(e.target.value)}


                placeholder="Search by author or title" />
        </>
    )
}
export default GoogleSearch;
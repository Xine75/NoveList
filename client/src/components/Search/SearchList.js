import { React, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchContext } from "../Providers/SearchProvider";
import { SearchCard } from "./SearchCard";

//SearchList will be responsible rendering the search results to
//the DOM

export const SearchList = () => {
    const { searchResult, setSearchResult } = useContext(SearchContext);

    //----feed each object in the searchResult array into the SearchCard------

    return (
        <>
            <div className="searchResult">
                {searchResult.map(sr => {
                    return <SearchCard key={searchResult.id} searchResult={searchResult} />
                })}
            </div>
        </>
    );
};
export default SearchList;
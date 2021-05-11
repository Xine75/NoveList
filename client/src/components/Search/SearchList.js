import { React, useContext } from 'react';
import { SearchContext } from "../Providers/SearchProvider";
import { SearchCard } from "./SearchCard";

//SearchList will be responsible rendering the search results to
//the DOM

export const SearchList = () => {
    const { searchResult, searchSuccess } = useContext(SearchContext);


    //----feed each object in the searchResult array into the SearchCard------

    return (
        <>
            <div className="searchResult">

                {searchSuccess ?
                    <h2>Your search has returned no results.</h2>
                    :
                    ""}


                {searchResult.map(searchResult => {
                    return <SearchCard key={searchResult.id} searchResult={searchResult} />
                })}
            </div>
        </>
    );
};
export default SearchList;
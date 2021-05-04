import { React, useContext } from 'react';
import SearchContext from "../Providers/SearchProvider";

export const SearchList = () => {
    const { searchResults, setSearchResults } = useContext(SearchContext);

    //SearchList will be responsible rendering the search results to
    //the DOM


}
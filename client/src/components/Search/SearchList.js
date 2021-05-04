import { React, useContext } from 'react';
import SearchContext from "../Providers/SearchProvider";

export const SearchList = () => {
    const { searchResult, setSearchResult } = useContext(SearchContext);

    //SearchList will be responsible rendering the search results to
    //the DOM


}
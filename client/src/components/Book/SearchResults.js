import React, { useContext, useState } from "react";
import { SearchContext } from "../Providers/SearchProvider";
import { Button } from 'react-bootstrap'
import { useParams } from "react-router";

export const GoogleSearchResults = () => {
    const { setSearchTerms, searchResults, setSearchResults } = useContext(SearchContext);
    const { Search } = useContext(SearchContext);

    const { searchTerms } = useParams()
}
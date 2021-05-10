import React, { useContext, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { SearchContext } from "../Providers/SearchProvider";
import {SearchList } from "./SearchList"
import { Button } from 'react-bootstrap'

//This component is responsible for rendering the search bar
//and redirecting the user to the search results (SearchList) when
//the submit button is clicked

export const GoogleSearch = () => {
    const [searchTerms, setSearchTerms] = useState("");
    const { Search } = useContext(SearchContext);
    const history = useHistory();

    const searchSubmit = (e) => {
        e.preventDefault();
        Search(searchTerms)
            .then(() => history.push(`/search/${searchTerms}`))
    }
    return (
        <>
            Search for a Book:
         
            <input type="text" className="input--wide" value={searchTerms}             

            onChange={e => setSearchTerms(e.target.value)} placeholder="Search by author or title" />
            <Button onClick={searchSubmit}>Search</Button>
            
            <SearchList />
        </>
    )
}
export default GoogleSearch;

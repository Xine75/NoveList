import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import { SearchContext } from "../Providers/SearchProvider";
import { SearchList } from "./SearchList"
import { Button } from 'react-bootstrap'
import "./Search.css"

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
            <div className="book__search__page">

                <h4>Search for a Book</h4>

                <input type="text" className="book__search__input" value={searchTerms}

                    onChange={e => setSearchTerms(e.target.value)} placeholder="Search by author or title" />
                <Button onClick={searchSubmit}>Search</Button>

            </div>

            <SearchList />
        </>
    )
}
export default GoogleSearch;

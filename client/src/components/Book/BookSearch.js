import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { SearchContext } from "../Providers/SearchProvider";
import { Button } from 'react-bootstrap'

export const GoogleSearch = () => {
    const { setSearchResults } = useContext(SearchContext);
    const [searchTerms, setSearchTerms] = useState("");
    const { Search } = useContext(SearchContext);
    const history = useHistory();

    // const searchSubmit = (e) => {
    //     e.preventDefault();
    //     Search(searchTerms)
    //         .then(() => history.push(`/search/${searchTerms}`))
    //         .then(() => setSearchResults(e.target.value))
    // }

    useEffect(() => {
        Search(searchTerms);
    }, []);

    return (
        <>
            Search for a Book:
            <div className="instrument-search__form">
                <input id="search" value={criterion} onChange={e => setSearchTerms(e.target.value)} />
                <Button onClick={() => searchInstruments(searchTerms)}>Search</Button>
            </div>


            {/*             
            <input type="text" className="input--wide"

                placeholder="Search by author or title" />
            <Button onClick={searchSubmit}>Search</Button> */}
        </>
    )
}
export default GoogleSearch;

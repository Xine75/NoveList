import React, { useContext, useState } from "react";
import { SearchContext } from "../Providers/SearchProvider";
import { Button, Link } from 'react-bootstrap'
import { useParams } from "react-router";


export const GoogleSearchResults = () => {
    const { searchResults, setSearchResults } = useContext(SearchContext);


    const { searchTerms } = useParams()

    useEffect(() => {
        setSearchResults()
    }, [])

    return (
        <>

        </>
    )
}

// i want to render the search results here, so I think i need to map
// over search results and render title thumbnail, author , and href image.
// each book needs a link to "choose".
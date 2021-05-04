import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { SearchContext } from "../Providers/SearchProvider"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"

//SearchCard will take care of the details of each novel:
//id, title, image, author, summary and link to add novel to collection

export const SearchCard = ({ searchResult }) => {
    debugger
    return (
        <>
            <Card className="searchResult_card" border="success">
                <Card.Body>
                    <Card.Img className="searchResult__card__image" src={searchResult.imageURL} />
                    <Card.Title className="searchResult_title">
                        {searchResult.title}
                        <div className="searchResult__author">{searchResult.authors.ToString()}</div>
                        <div className="searchResult__summary">{searchResult.textSnippet}</div>
                    </Card.Title>
                </Card.Body>

            </Card>
            <br />
        </>
    );
};
export default SearchCard;
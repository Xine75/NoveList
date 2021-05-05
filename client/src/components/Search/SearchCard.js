import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { SearchContext } from "../Providers/SearchProvider"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { BookForm } from "../Book/BookForm"
import Button from "react-bootstrap/Button"
import "./Search.css"
import FormImpl from "react-bootstrap/esm/Form"

//SearchCard will take care of the details of each novel:
//id, title, image, author, summary and link to add novel to collection

export const SearchCard = ({ searchResult }) => {

    //--------------Setting up modal------------------


    return (
        <>
            <Card className="searchResult_card" border="success">
                <Card.Body>
                    <Card.Img className="searchResult__card__image" src={searchResult.thumbnail} />
                    <Card.Title className="searchResult_title">
                        <Button variant="link" onClick={<BookForm />}>{searchResult.title}</Button>
                        <div className="searchResult__author">{searchResult.authors}</div>
                        <div className="searchResult__summary">{searchResult.textSnippet}</div>
                    </Card.Title>
                </Card.Body>

            </Card>
            <br />
        </>
    );
};
export default SearchCard;
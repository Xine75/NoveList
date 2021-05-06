import React, { useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { SearchContext } from "../Providers/SearchProvider"
import { BookContext } from "../Providers/BookProvider"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import "./Search.css"

//SearchCard will take care of the details of each novel:
//id, title, image, author, summary and link to add novel to collection

export const SearchCard = ({ searchResult }) => {


    const history = useHistory();
    //--------------Setting up modal------------------
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //-------------------Setting State----------------------
    const { addBook } = useContext(BookContext);
    const [book, setBook] = useState({
        id: 0,
        googleApiId: searchResult.id,
        title: searchResult.title,
        author: searchResult.authors.toString(),
        thumbnail: searchResult.thumbnail,
        textSnippet: searchResult.textSnippet,
        shelfId: 0
    })

    //-------------Saving User Input-------------
    const handleControlledInputChange = (e) => {
        const newBook = { ...book }
        newBook[e.target.id] = e.target.value
        setBook(newBook)
    };

    //------------Saving New Book on Click Event-------------

    const handleClickSaveBook = (e) => {
        e.preventDefault()
        const newBook = { ...book }
        addBook(newBook)
            .then(() => history.push("/"))
    };

    //-------------------------JSX for Search Card & Book Add Modal-------------------------

    return (
        <>
            <div className="searchResult__card__container">

                <Card style={{ width: '18rem' }} className="searchResult_card" border="no border">
                    <Card.Body>
                        <Card.Img className="searchResult__card__image" src={searchResult.thumbnail} />
                        <Card.Title className="">
                            <Button variant="link" onClick={handleShow} className="searchResult_title" id="bootstrap" >
                                {searchResult.title}</Button>
                            <h5 className="searchResult__author">{searchResult.authors}</h5>
                            <div className="searchResult__summary">{searchResult.textSnippet}</div>
                        </Card.Title>
                    </Card.Body>

                </Card>
            </div>
            <br />


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add {searchResult.title} to My Library</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="shelfId">Add To Shelf:</label>
                            <select name="shelfId" id="shelfId" className="form-control" onChange={handleControlledInputChange}>
                                <option value="0">Choose a shelf</option>
                                <option value="1">Currently Reading</option>
                                <option value="2">Book Club</option>
                                <option value="3">Mystery</option>
                                <option value="4">Historical Fiction</option>
                                <option value="5">Beach Read</option>
                            </select>
                        </div>
                    </fieldset>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClickSaveBook}>Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default SearchCard;



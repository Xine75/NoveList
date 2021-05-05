import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { BookContext } from "..//Providers/BookProvider"
import Modal from "react-bootstrap/Button"
import Button from "react-bootstrap/Button"
import { propTypes } from "react-bootstrap/esm/Image";

//BookForm allows a user to add a book from the google search results - NO EDIT HERE
//will be directed here by clicking on title from search results
//will be a pop-up/modal
//will add book upon click Save

export const BookForm = (props) => {

    const { addBook } = useContext(BookContext);
    //-------------Only choice is shelf----------------

    const [book, setBook] = useState({
        googleApiId: "searchResult.Id",
        shelfId: 0
    });

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
        props.onHide()
    };

    //--------------Setting up modal------------------
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //---------------JSX ADD BOOK Modal-----------------------
    return (
        <>

            <Modal id="bootstrap"
                {...props}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton id="bootstrap">
                    <Modal.Title>Add Novel to My Library</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* import details of chosen book */}

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="shelfId">Add To Shelf:</label>
                            <select value={book.shelfId} name="shelfId" id="shelfId" className="form-control" onChange={handleControlledInputChange}>
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
                    <Button variant="primary" onClick={addBook}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )





}
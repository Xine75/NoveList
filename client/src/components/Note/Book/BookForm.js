import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { BookContext } from "..//Providers/BookProvider"
import Modal from "react-bootstrap/Button"
import Button from "react-bootstrap/Button"

//BookForm allows a user to add a book from the google search results - NO EDIT HERE
//will be directed here by clicking on title from search results
//will be a pop-up/modal
//will add book upon click Save

export const BookForm = () => {

    const { addBook } = useContext(BookContext);
    //-------------Only choice is shelf----------------

    const [book, setBook] = useState({
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
            .then(() => history.push("/"))//close modal and go to home page w/new book
    };

    //------------setting up Modal --------------------
    function AddBookPopUp() {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
    }



    //---------------JSX ADD BOOK Modal-----------------------






}
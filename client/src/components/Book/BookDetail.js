import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { BookContext } from "../Providers/BookProvider"
import { NoteList } from "../Note/NoteList"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Modal from "react-bootstrap/Modal"

export const BookDetail = () => {
    const { getBookById, updateBook } = useContext(BookContext);
    const bookId = useParams().id;
    const history = useHistory();
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const [book, setBook] = useState({
        id: bookId,
        shelfId: 0,
        rating: 0,
        finishDate: "",
        shelf: { name: "" }

    });
    const startDate = new Date(book.startDate).toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });


    //-------------Find correct book using book Id in params -------------
    useEffect(() => {
        getBookById(bookId).then(setBook)
    }, []);



    //-------------Saving User Input-------------
    const handleControlledInputChange = (e) => {
        const newBook = { ...book }
        newBook[e.target.id] = e.target.value
        setBook(newBook)
    };


    //----handle Finish Book ---------------
    const handleFinish = (e) => {
        e.preventDefault()
        updateBook({
            id: bookId,
            shelfId: book.shelfId,
            rating: book.rating,
            finishDate: book.finishDate
        })
            .then(() => {
                history.push("/book")
            })
    }


    //--------------Setting up modal------------------
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    //-----------------JSX for Book Details and Book Finished Modal-------------------------

    return (
        <>
            <section className="book" style={{ width: '20rem' }}>
                <Row>
                    <Col>
                        <img src={book.thumbnail} className="book__detail__image" />
                    </Col>

                    <Col>
                        <Button className="finish__btn" variant="primary" size="sm" onClick={handleShow}>I Finished!</Button>

                    </Col>
                </Row>
                <br />
                <section className="book__details">
                    <h3 className="book__detail__title"><b>{book.title}</b></h3>
                    <div className="book__detail__author"><i>{book.author}</i></div>
                    <div className="book__startDate">Started: {startDate}</div>
                    <div className="book__textSnippet">{book.textSnippet}</div>
                    <div className="book__detail__shelfName">Shelved as: {book.shelf.name}</div>
                </section>
                <br />



            </section>
            <NoteList />
            <Button className="book__detail__done__btn" variant="link" size="sm"
                onClick={() => { history.push("/book") }}>Done</Button>





            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>I finished the book!</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name">Date Finished:</label>
                            <input type="date" id="finishDate" onChange={handleControlledInputChange} required className="form-control" value={book.finishDate} />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="rating">Rating</label>
                            <select name="rating" id="rating" className="form-control" onChange={handleControlledInputChange}>
                                <option value="0">What did you think?</option>
                                <option value="1">One Star</option>
                                <option value="2">Two Stars</option>
                                <option value="3">Three Stars</option>
                                <option value="4">Four Stars</option>
                                <option value="5">Five Stars</option>
                            </select>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="shelfId">Reshelve?</label>
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
                    <Button variant="primary" onClick={handleFinish}>Add Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
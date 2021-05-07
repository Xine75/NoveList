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
    const [book, setBook] = useState({});
    const bookId = useParams().id;
    const history = useHistory();
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const startDate = new Date(book.startDate).toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });

    //--------------Setting up modal------------------
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //-------------Saving User Input-------------
    const handleControlledInputChange = (e) => {
        const newBook = { ...book }
        newBook[e.target.id] = e.target.value
        setBook(newBook)
    };


    //----handle Finish Book ---------------
    const handleFinish = () => {
        updateBook({
            id: book.id,
            shelfId: book.shelf.id,
            shelf: book.shelf.name,
            rating: book.rating,
            finishDate: book.finishDate
        })
            .then(() => {
                history.push("/book/${bookId}")
            })
    }

    //-------------Find correct book using book Id in params -------------
    useEffect(() => {
        getBookById(bookId).then(setBook)
    }, []);

    console.log("book", book);


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
                    {/* <div className="book__detail__shelfName">{book.shelf.name}</div> */}
                </section>
                <br />

            </section>
            {/* <NoteList /> */}
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
                            <input type="date" id="dateFinished" onChange={handleControlledInputChange} required className="form-control" value={book.finishDate} />
                        </div>
                    </fieldset>

                    {/* <fieldset>
                        <select class="dropdown" id="shelfSelect">
                            <option value="0">Select a Shelf</option>
                                ${
                                book.shelfId.map((book) => `<option value=${book.shelf.id}>${book.shelf.name}</option>`
                                )
                            }
                        </select>
                    </fieldset> */}

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
                    <Button variant="primary" onClick={handleFinish}>Add Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { BookContext } from "../Providers/BookProvider"
import { FriendContext } from "../Providers/FriendProvider";
import { NoteList } from "../Note/NoteList"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Modal from "react-bootstrap/Modal"
import "./Book.css"

export const BookDetail = () => {
    const { getBookById, updateBook } = useContext(BookContext);
    const { getFriendsByBookId } = useContext(FriendContext);
    const [matchingFriends, setMatchingFriends] = useState([]);
    const bookId = useParams().id;

    const history = useHistory();

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


    //--------------Setting up modal------------------
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //-------------Saving User Input in I Finished Modal-------------
    const handleControlledInputChange = (e) => {
        const newBook = { ...book }
        newBook[e.target.id] = e.target.value
        setBook(newBook)
    };


    //----handle Finish Book after adding details in Modal---------------
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

    //--------------finding friends who've added this book-------------

    useEffect(() => {
        getBookById(bookId)
            .then(setBook)

    }, [])

    useEffect(() => {
        getFriendsByBookId(book.googleApiId)
            .then((x) => {
                if (x) {
                    setMatchingFriends(x)
                }
                return
            })
    }, [book])



    //-----------------JSX for Book Details and Book Finished Modal-------------------------

    return (
        <>
            <section className="book" style={{ width: '80rem' }}>
                <Row>
                    <Col>
                        <img src={book.thumbnail} className="book__detail__image" />
                    </Col>

                    <Col>
                        <Button className="finish__btn" variant="primary" size="sm" onClick={handleShow}>I Finished!</Button>
                        <Button className="book__detail__done__btn" variant="link" size="sm"
                            onClick={() => { history.push("/book") }}>Done</Button>

                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <section className="book__details">
                            <h3 className="book__detail__title"><b>{book.title}</b></h3>
                            <div className="book__detail__author"><i>{book.author}</i></div>
                            <div className="book__startDate"><b>Started:</b> {startDate}</div>
                            <div className="book__description">{book.description}</div>
                            <div className="book__detail__shelfName"><b>Shelved as:</b> {book.shelf.name}</div>
                        </section>
                    </Col>
                    <Col>
                        <h7>Friends who have also read this book:</h7>
                        <div>
                            {
                                matchingFriends.map(matchingFriend => matchingFriend.friendInfo.userName).join(", ")
                            }
                        </div>
                    </Col>
                </Row>
                <br />
            </section>


            <NoteList />


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
                                <option value="1">⭐</option>
                                <option value="2">⭐⭐</option>
                                <option value="3">⭐⭐⭐</option>
                                <option value="4">⭐⭐⭐⭐</option>
                                <option value="5">⭐⭐⭐⭐⭐</option>
                            </select>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="shelfId">Reshelve?</label>
                            <select name="shelfId" id="shelfId" className="form-control" onChange={handleControlledInputChange}>
                                <option value="0">Choose a shelf</option>
                                <option value="1">Book Club</option>
                                <option value="2">Currently Reading</option>
                                <option value="3">Experimental</option>
                                <option value="4">Fantasy/Mythological</option>
                                <option value="5">Favorites</option>
                                <option value="6">Graphic Novel</option>
                                <option value="7">Horror</option>
                                <option value="8">Literary</option>
                                <option value="9">Mystery</option>
                                <option value="10">Romance</option>
                                <option value="11">Speculative</option>
                                <option value="12">Suspense/Thriller</option>
                                <option value="13">Western</option>
                                <option value="14">Young Adult</option>
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
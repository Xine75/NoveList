import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { BookContext } from "../Providers/BookProvider"
import { NoteList } from "../Note/NoteList"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

export const BookDetail = () => {
    const { getBookById } = useContext(BookContext);
    const [book, setBook] = useState();
    const bookId = useParams().id;
    const history = useHistory();
    //const startDate = new Date(book.startDate).toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });


    //----handle Finish Book ---TODO: WRITE EDIT METHOD AND MODAL FOR FINISHING
    // const handleFinish = () => {
    //     editBook(book.id)
    //         .then(() => {
    //             history.push("/book/${bookId}")
    //         })
    // }

    //-------------Find correct book using book Id in params -------------
    useEffect(() => {
        getBookById(bookId).then(setBook)
    }, []);

    console.log("book", book);


    //-----------------JSX for Book Details-------------------------

    return (
        <>

            <section className="book" style={{ width: '20rem' }}>
                <Row>
                    <Col>
                        <img src={book.thumbnail} className="book__detail__image" />
                    </Col>

                    <Col>
                        <Button className="book__done__btn" variant="link" size="sm" onClick={() => { history.push("/book") }}>Done</Button>

                    </Col>
                </Row>
                <br />
                <section className="book__details">
                    <h3 className="book__detail__title"><b>{book.title}</b></h3>
                    <div className="book__detail__author"><i>{book.author}</i></div>
                    <div className="book__startDate">Started: {book.startDate}</div>
                    <div className="book__textSnippet">{book.textSnippet}</div>
                    {/* <div className="book__detail__shelfName">{book.shelf.name}</div> */}
                </section>
                <br />

            </section>
            {/* <NoteList /> */}
        </>
    )
}
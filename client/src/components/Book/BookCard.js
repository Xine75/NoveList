import React, { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { BookContext } from "../Providers/BookProvider"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"


//Book Card renders list view of current user's books
//Renders a link on a book title that will take the user to details and notes for a specific book

export const BookCard = ({ book }) => {

    const { deleteBook, getAllBooks } = useContext(BookContext)


    const history = useHistory();
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const startDate = new Date(book.startDate).toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
    const finishDate = book.finishDate ? new Date(book.finishDate).toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }) : null;


    //-----------------HANDLE DELETE --------------------

    const handleDelete = () => {
        deleteBook(book.id)

            .then(() => {
                history.push("/book")

            }).then(getAllBooks)
    }


    //------------------JSX for Book Card -------------------------
    return (
        <>

            <tr>
                <td>{startDate}</td>
                <td><img src={book.thumbnail} /></td>
                <td><Link to={`/book/${book.id}`}>{book.title}</Link></td>
                <td>{book.author}</td>
                <td>{book.shelf.name}</td>
                <td>{book.rating}</td>
                <td>{finishDate}</td>
                <td><Button onClick={handleDelete}>Delete</Button></td>
            </tr>


        </>
    )
}
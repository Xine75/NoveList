import React, { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { BookContext } from "../Providers/BookProvider"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"


//Book Card renders list view of current user's books
//Renders a link on a book title that will take the user to details and notes for a specific book

export const BookCard = ({ book }) => {

    const { deleteBook } = useContext(BookContext)

    const history = useHistory();
    const date = new Date(book.startDate).toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });

    //-----------------HANDLE DELETE --------------------

    const handleDelete = () => {
        deleteBook(book.id)

    }



    //------------------JSX for Book Card -------------------------
    return (
        <>
            <h3>My Library</h3>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>

                        <th>Date Started</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Shelf</th>
                        <th>Rating</th>
                        <th>Date Finished</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td>{date}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.shelf.name}</td>
                        <td>{book.rating}</td>
                        <td>{book.finishDate}</td>
                        <td><Button onClick={handleDelete}>Delete</Button></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

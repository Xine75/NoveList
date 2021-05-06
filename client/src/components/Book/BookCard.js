import React, { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { BookContext } from "../Providers/BookProvider"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import "./Book.css"

//Book Card renders list view of current user's books
//Renders a link on a book title that will take the user to details and notes for a specific book

export const BookCard = ({ book }) => {

    const history = useHistory();
    const { books, setBooks } = useContext(BookContext);

    //------------------JSX for Book Card -------------------------

    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>Date Added</th>
                <th>Title</th>
                <th>Author</th>
                <th>Shelf</th>
                <th>Rating</th>
                <th>Date Finished</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{book.StartDate}</td>
                <td>{book.Title}</td>
                <td>{book.Authors}</td>
                <td>{book.ShelfId}</td>
                <td>{book.Rating}</td>
                <td>{book.FinishDate}</td>
            </tr>
        </tbody>
    </Table>

}
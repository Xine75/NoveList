import { React, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BookContext } from "../Providers/BookProvider";
import { BookCard } from "./BookCard";
import Table from "react-bootstrap/Table"

//Book List will be responsible for rendering a list of the current user's books

export const BookList = () => {

    const { books, getAllBooks } = useContext(BookContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile")).id;

    //------- get Books---------------------

    useEffect(() => {
        getAllBooks()
    }, [])


    //--------------FILTER books for those belonging to current user, then feed each object in the array into BookCard
    return (
        <>

            <h3>My Library</h3>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>

                        <th>Date Started</th>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Shelf</th>
                        <th>Rating</th>
                        <th>Date Finished</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="books">
                    {
                        books.filter(b => b.userId === currentUser).map(book => {
                            return <BookCard key={book.id} book={book} />
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}
export default BookList;
import { React, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BookContext } from "../Providers/BookProvider";
import { BookCard } from "./BookCard";

//Book List will be responsible for rendering a list of the current user's books

export const BookList = () => {

    const { book, getBooksByCurrentUser } = useContext(BookContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile")).id;

    //------- get Books---------------------

    useEffect(() => {
        getBooksByCurrentUser(currentUser)
    }, [])

    //--------------FILTER books for those belonging to current user, then feed each object in the array into BookCard
    return (
        <>
            <div className="books">
                {
                    book.filter(b => b.userId === currentUser).map(book => {
                        return <BookCard key={book.id} book={book} />
                    })
                }
            </div>
        </>
    )


}
import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import { SearchContext } from "./SearchProvider";

export const BookContext = createContext();

export function BookProvider(props) {
    const apiUrl = "/api/book";
    const { getToken } = useContext(UserProfileContext);
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({})

    const getAllBooks = () => {
        //the proxy that was set up in package.json will be handling the first part of the URL
        return getToken()
            .then((token) =>
                fetch(`${apiUrl}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => res.json())
            )
            .then(setBooks);
    };
    const getBookById = (bookId) => {
        //the proxy that was set up in package.json will be handling the first part of the URL
        return getToken()
            .then((token) =>
                fetch(`${apiUrl}/${bookId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => res.json())
            )
    };
    const getBooksByCurrentUser = (userId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
        )
            .then(setBooks)
    };

    const addBook = bookObj => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookObj)
            }));
    };

    const updateBook = (book) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${book.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
            }))
    }

    const deleteBook = (bookId) => {
        return getToken()
            .then((token) =>
                fetch(`${apiUrl}/${bookId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            )
    };
    return (
        <BookContext.Provider
            value={{
                book, books,
                setBooks, setBook,
                getAllBooks, getBookById,
                getBooksByCurrentUser, addBook,
                updateBook, deleteBook
            }}
        >
            {props.children}
        </BookContext.Provider>
    );

}
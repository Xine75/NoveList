import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const NoteContext = createContext();

export function NoteProvider(props) {
    const { getToken } = useContext(UserProfileContext);
    const [note, setNote] = useState([]);
    const [notes, setNotes] = useState([]);

    const getNotesByBookId = (bookId) => {
        return getToken().then((token) =>
            fetch(`notes/${bookId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setNotes)
        )
    }
}
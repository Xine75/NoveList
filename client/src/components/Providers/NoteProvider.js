import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const NoteContext = createContext();

export function NoteProvider(props) {
    const apiUrl = "/api/note";
    const { getToken } = useContext(UserProfileContext);
    const [note, setNote] = useState([]);
    const [notes, setNotes] = useState([]);

    const getNotesByBookId = (bookId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${bookId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setNotes)
        )
    };
    const addNote = noteObj => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(noteObj)
            }));
        //.then(resp => resp.json())
    };


    return (
        <NoteContext.Provider
            value={{ note, notes, setNote, setNotes, getNotesByBookId, addNote }}
        >
            {props.children}
        </NoteContext.Provider>
    );
};
export default NoteProvider;
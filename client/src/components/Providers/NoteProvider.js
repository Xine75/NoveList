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

    const getNoteById = (noteId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/detail/${noteId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
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
            })
        );
    };

    const updateNote = (note) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${note.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(note)
            }))
    }
    const deleteNote = (noteId) => {
        return getToken()
            .then((token) =>
                fetch(`${apiUrl}/${noteId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            )
    };
    return (
        <NoteContext.Provider
            value={{ note, notes, setNote, setNotes, getNotesByBookId, getNoteById, addNote, updateNote, deleteNote }}
        >
            {props.children}
        </NoteContext.Provider>
    );
};
export default NoteProvider;
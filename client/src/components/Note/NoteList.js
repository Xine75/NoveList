import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { NoteContext } from "../Providers/NoteProvider";
import { Note } from "./Note";
import Button from "react-bootstrap/Button";

export const NoteList = () => {
    const { notes, getNotesByBookId } = useContext(NoteContext);
    const history = useHistory();
    const { bookId } = useParams();

    useEffect(() => {
        getNotesByBookId();
    }, []);

    return (
        <>
            <h4 className="notes__header">Notes</h4>
            <div className="notes">


                {
                    notes.filter(note => note.bookId === parseInt(bookId)).map(note => {

                        return <Note key={note.id} note={note} />
                    })
                }
            </div>
        </>
    );
};
export default NoteList;
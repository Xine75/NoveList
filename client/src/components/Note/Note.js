import React, { useContext } from "react";
import { NoteContext } from "../Providers/NoteProvider";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const Note = ({ note }) => {
    const { deleteNote, getNotesByBookId } = useContext(NoteContext);

    //----------------- DELETE NOTE FUNCTION ------------------------

    const handleDelete = () => {
        deleteNote(note.id)
            .then(getNotesByBookId)
    }



    return (
        <>
            <Card className="note" border="secondary" style={{ width: '2 rem' }} bg="#b2d3c2" id={note.id}>
                <Card.Header className="note__date">{note.pageNum}
                </Card.Header>

                <Card.Body className="note__text">
                    <div className="note__text">{note.content}</div>
                </Card.Body>
                <Button variant="link" size="sm" onClick={handleDelete}>Delete</Button>

            </Card>
        </>
    )
};
export default Note;

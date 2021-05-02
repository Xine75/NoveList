import React, { useContext } from "react";
import { NoteContext } from "./Providers/NoteProvider";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const NoteCard = ({ note }) => {
    const { getNotesByBookId } = useContext(NoteContext);



    return (
        <>
            <Card className="note" border="secondary" style={{ width: '2 rem' }} bg="#b2d3c2" id={note.id}>
                <Card.Header className="note__date">{note.pageNum}
                </Card.Header>

                <Card.Body className="note__text">
                    <div className="note__text">{note.content}</div>
                </Card.Body>
            </Card>
        </>
    )
}

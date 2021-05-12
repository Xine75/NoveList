import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NoteContext } from "../Providers/NoteProvider";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import "./Note.css"

export const Note = ({ note }) => {

    const { deleteNote, getNotesByBookId, updateNote, getNoteById } = useContext(NoteContext);
    const bookId = useParams().id;

    //--------------Setting up modal------------------
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // --------------------- Setting State-----------------------
    const [editedNote, setEditedNote] = useState(note)

    //-------------Saving User Input-------------
    const handleControlledInputChange = (e) => {
        const newNote = { ...editedNote }
        newNote[e.target.id] = e.target.value
        setEditedNote(newNote)
    };


    //--------------Saving edited note input---------------------

    const handleClickUpdateNote = (e) => {
        e.preventDefault()
        updateNote({
            id: editedNote.id,
            pageNum: editedNote.pageNum,
            content: editedNote.content
        })
            .then(getNotesByBookId(bookId))
            .then(() => { handleClose() })
    }
    //------------------Get Notes by Id------------------------
    useEffect(() => {
        getNoteById(editedNote.id)
            .then(editedNote => {
                setEditedNote(editedNote)
            })
    }, []);


    //----------------- DELETE NOTE FUNCTION ------------------------

    const handleDelete = () => {
        deleteNote(note.id)
            .then(getNotesByBookId(bookId))
    }


    //-------------------JSX for Note Card ---------------------------------


    return note ? (
        <>

            <Card className="note" border="secondary" style={{ width: '25rem' }} id={note.id}>

                <Card.Header className="note__page">page {note.pageNum} </Card.Header>

                <Card.Body className="note__text">
                    <div className="note__text">{note.content}</div>

                </Card.Body>
                <div className="card__links">
                    <Card.Link className="note__edit" variant="link" size="sm" onClick={handleShow}><i class="fas fa-pencil-alt"></i></Card.Link>
                    <Card.Link className="note__trash" size="sm" onClick={handleDelete}><i class="far fa-trash-alt"></i></Card.Link>
                </div>
            </Card>



            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>What are you thinking?</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="pageNum">Page?</label>
                            <input type="text" id="pageNum" defaultValue={editedNote.pageNum} onChange={handleControlledInputChange} required className="form-control" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="content">Thoughts?</label>
                            <input type="textarea" rows="10" id="content" defaultValue={editedNote.content} onChange={handleControlledInputChange} required className="form-control" />
                        </div>
                    </fieldset>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClickUpdateNote}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    ) : null;
}
export default Note;



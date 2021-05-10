import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NoteContext } from "../Providers/NoteProvider";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

export const Note = ({ note }) => {

    const { deleteNote, getNotesByBookId, updateNote, getNoteById } = useContext(NoteContext);
    const [setNote] = useState({})
    const bookId = useParams().id;

    //--------------Setting up modal------------------
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // --------------------- Setting State-----------------------
    // const [setNote] = useState({
    //     id: 0,
    //     pageNum: 0,
    //     content: "",
    //     bookId: bookId
    // })

    //-------------Saving User Input-------------
    const handleControlledInputChange = (e) => {
        const newNote = { ...note }
        newNote[e.target.id] = e.target.value
        // setNote(newNote)
    };

    //--------------Jess' method Saving user input----------------
    // const handleControlledInputChange = (e) => {
    //     const newNote = { ...note }
    //     let selectedVal = e.target.value
    //     if (e.target.id.includes("id")) {
    //         selectedVal = parseInt(selectedVal)
    //     }
    //     newNote[e.target.id] = selectedVal
    //     //setNote(newNote)
    // }

    //--------------Saving edited note input---------------------

    const handleClickUpdateNote = (e) => {
        e.preventDefault()
        updateNote({
            id: note.id,
            pageNum: note.pageNum,
            content: note.content
        })
            .then(getNotesByBookId(bookId))
            .then(() => { handleClose() })
    }
    //------------------Get Notes by Id------------------------
    useEffect(() => {
        getNoteById(note.id)
        // .then(note => {
        //     setNote(note)
        // })
    }, []);


    //----------------- DELETE NOTE FUNCTION ------------------------

    const handleDelete = () => {
        deleteNote(note.id)
            .then(getNotesByBookId(bookId))
    }


    //-------------------JSX for Note Card ---------------------------------


    return note ? (
        <>
            <Card className="note" border="secondary" style={{ width: '2 rem' }} bg="#b2d3c2" id={note.id}>
                <Card.Header className="note__date">Page: {note.pageNum}
                </Card.Header>

                <Card.Body className="note__text">
                    <div className="note__text">{note.content}</div>
                </Card.Body>
                <Button variant="link" size="sm" onClick={handleDelete}>Delete</Button>
                <Button variant="link" size="sm" onClick={handleShow} >Edit</Button>

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
                            <input type="text" id={note.pageNum} defaultValue={note.pageNum} onChange={handleControlledInputChange} required className="form-control" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="content">Thoughts?</label>
                            <input type="textarea" rows="10" id={note.content} defaultValue={note.content} onChange={handleControlledInputChange} required className="form-control" />
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



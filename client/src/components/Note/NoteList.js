import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { NoteContext } from "../Providers/NoteProvider";
import { BookContext } from "../Providers/BookProvider"
import { Note } from "./Note";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const NoteList = () => {
    const { notes, setNotes, getNotesByBookId } = useContext(NoteContext);
    const history = useHistory();
    const bookId = useParams().id;

    //--------------Setting up modal------------------
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    //-------------------Setting State----------------------

    const { addNote, getNoteById } = useContext(NoteContext);
    const [note, setNote] = useState({
        id: 0,
        pageNum: 0,
        content: "",
        bookId: bookId
    })

    //-------------Saving User Input-------------
    const handleControlledInputChange = (e) => {
        const newNote = { ...note }
        newNote[e.target.id] = e.target.value
        setNote(newNote)
    };

    //--------------Saving New or EDITED Note upon Click event-----------------
    const handleClickSaveNote = (e) => {
        e.preventDefault()
        if (note.id) {
            updateNote({
                id: note.id,
                pageNum: note.pageNum,
                content: note.content
            })
                .then(getNotesByBookId(bookId))
                .then(() => { handleClose() })
        } else {
            addNote({
                bookId: parseInt(bookId),
                content: note.content,
                pageNum: note.pageNum
            })
                .then(getNotesByBookId(bookId))
                .then(() => { handleClose() })
        }

    }
    //------------------Get Notes by Id------------------------
    useEffect(() => {
        if (note.id) {
            getNoteById(note.id)
                .then(note => {
                    setNote(note)
                })
        } else {
            getNotesByBookId(bookId)
                .then(note => {
                    setNote(note)

                })
        }
    }, []);

    //------------------JSX for NoteList and Add Note Modal----------------------------
    return notes ? (
        <>
            <h4 className="notes__header">Notes</h4>
            <div className="notes">


                {
                    notes.filter(note => note.bookId === parseInt(bookId)).map(note => {

                        return <Note key={note.id} note={note} />
                    })
                }
            </div>
            <div>
                <Button className="notes__btn" size="sm" variant="info" onClick={handleShow}>
                    Add a Note
                </Button>
            </div>

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
                            <label htmlFor="name">Page?</label>
                            <input type="text" id="pageNum" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Page" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name">Thoughts?</label>
                            <input type="textarea" rows="10" id="content" onChange={handleControlledInputChange} required className="form-control" placeholder="Your thoughts?" />
                        </div>
                    </fieldset>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClickSaveNote}>{note.id ? <>Save Changes</> : <>Add</>}</Button>
                </Modal.Footer>
            </Modal>

        </>
    ) : null;
};
export default NoteList;
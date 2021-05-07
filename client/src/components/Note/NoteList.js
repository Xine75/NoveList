import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { NoteContext } from "../Providers/NoteProvider";
import { Note } from "./Note";
import Button from "react-bootstrap/Button";

export const NoteList = () => {
    const { notes, getNotesByBookId } = useContext(NoteContext);
    const history = useHistory();
    const bookId = useParams().id;

    //--------------Setting up modal------------------
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //-------------------Setting State----------------------
    const { addNote } = useContext(NoteContext);
    const [note, setNote] = useState({
        id: 0,
        pageNum: 0,
        content: "",
        bookId: bookId
    })

    //-------------Saving User Input-------------
    const handleControlledInputChange = (e) => {
        const newNote = { ...book }
        newBook[e.target.id] = e.target.value
        setNote(newNote)
    };

    //--------------Saving New Note upon Click event-----------------
    const handleClickSaveNote = (e) => {
        e.preventDefault()
        const newNote = { ...note }
        addNote(newNote)
            .then(() => history.push(`/book/${bookId}`))

    }
    //------------------Get Notes by Id------------------------
    useEffect(() => {
        getNotesByBookId(bookId)
            .then(note => {
                setNote(note)
            })
    }, []);

    //------------------JSX for NoteList ----------------------------
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
                            <input type="text" id="pageNum" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Plant name" value={plant.name} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name">Thoughts?</label>
                            <input type="textarea" rows="8" id="type" onChange={handleControlledInputChange} required className="form-control" placeholder="Scientific or common" value={plant.type} />
                        </div>
                    </fieldset>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClickSaveNote}>Add</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};
export default NoteList;
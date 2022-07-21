import React, { useContext } from 'react'
import notescontext from "../context/notes/Notescontext"

const NoteItem = (props) => {
    const context = useContext(notescontext)
    const { deletenote } = context;
    const { notes,updateNotes } = props
    return (
        <div className="col-md-3">


            <div className="card my-3">

                <div className="card-body">
                    <div className="d-flex align-items-center">

                        <h5 className="card-title">{notes.title}</h5>
                        <i className="fa-regular fa-trash-can mx-2" onClick={() => {
                            deletenote(notes._id)
                        }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{
                            updateNotes(notes)
                        }}></i>
                    </div>
                    <p className="card-text"> {notes.description}</p>


                </div>
            </div>
        </div>
    )
}

export default NoteItem

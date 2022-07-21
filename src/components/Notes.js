import React, { useContext, useRef, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import notescontext from "../context/notes/Notescontext"
import AddNotes from './AddNotes'
import NoteItem from './NoteItem'

const Notes = () => {

  const context = useContext(notescontext)
  let navigate= useNavigate()
  const { notes, getnote, editnote} = context
  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  useEffect(() => {
    if(localStorage.getItem('token')){

      getnote();
    }
    else{
      navigate('/login')
    }
  }, [])

  const ref = useRef(null);
  const refClose = useRef()
  const updateNotes = (currentNote) => {
    ref.current.click();
    setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  const handleClick = (e) => {
    console.log(note)
    editnote(note.id,note.etitle,note.edescription,note.etag)
    ref.current.click();

  }
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNotes />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit Notes
      </button>


      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Title</h5>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" minLength={5} required id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" minLength={5} required name="edescription" value={note.edescription} onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} />
                </div>


              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button ref={refClose} disabled={note.etitle.length<5 || note.edescription.length<5} type="button" class="btn btn-primary" onClick={handleClick}>Update notes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">

        <h2>Your Notes</h2>
        <div className="container">
          {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((notes) => {
          return <NoteItem key={notes._id} updateNotes={updateNotes} notes={notes} />
        })}
      </div>
    </>
  )
}

export default Notes

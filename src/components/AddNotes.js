import React,{useContext, useState} from 'react'
import notescontext from "../context/notes/Notescontext"

const AddNotes = () => {
    const context= useContext(notescontext)
  const {addnote}= context

  const [note,setnote]= useState({title: "", description: "", tag:"default"})

  const handleClick=(e)=>{
    e.preventDefault();
    addnote(note.title, note.description, note.tag)
    setnote({title: "", description: "", tag:""})
  }
  const onchange=(e)=>{
       setnote({...note,[e.target.name]: e.target.value})
  }
  return (
    <div className="container my-3">


      <h2>Add Notes!</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" minLength={5} required id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onchange} />
         
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" minLength={5} required id="description" value={note.description} name="description"  onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" minLength={5} required id="tag" name="tag" value={note.tag} onChange={onchange} />
        </div>
       
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
      </form>

      </div>
  )
}

export default AddNotes

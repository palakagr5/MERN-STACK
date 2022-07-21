import React from "react";
import { useState } from "react";
import notescontext from "./Notescontext";


const NoteState = (props) => {
   
  const host="http://localhost:5000"
   const notesInitial=[]
   const [notes, setNotes]= useState(notesInitial)

   //GET ALL NOTES

   const getnote=async ()=>{
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
      method: 'GET', 
      
      headers: {
        'Content-Type': 'application/json',
        "jwtData":  localStorage.getItem('token')
        
      },
      
      
    });
     const jsn= await response.json();
     console.log(jsn)
     setNotes(jsn)
   }

   //Add a note

   const addnote=async (title,description, tag)=>{

    const response = await fetch(`${host}/api/notes/addNote`, {
      method: 'POST', 
      
      headers: {
        'Content-Type': 'application/json',
        "jwtData":  localStorage.getItem('token')
        
      },
      
      body: JSON.stringify({title,description,tag})
    });

    const json= await response.json();

     
        const note=json
         setNotes(notes.concat(note))
   }
     //Delete a note
     const deletenote= async (id)=>{
          //  console.log("Deleting a note with id"+ id);
          const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE', 
            
            headers: {
              'Content-Type': 'application/json',
              "jwtData":  localStorage.getItem('token')
              
            }
            
            
          });
          const json= response.json();
          console.log(json)
          const newNote= notes.filter((note)=>{ return note._id!==id})
           setNotes(newNote)
    }
   //Edit a note
   const editnote=async (id,title,description,tag)=>{
     
   
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: 'PUT', 
      
      headers: {
        'Content-Type': 'application/json',
        "jwtData":  localStorage.getItem('token')
        
      },
      
      body: JSON.stringify({title,description,tag})
    });
    // const jso= response.json(); 
  

    let newNotes= JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id===id){
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag
        break;
      }
      
    }
    setNotes(newNotes)
}
    return (
        <notescontext.Provider value={{notes, addnote,deletenote,editnote,getnote}}>

            {props.children}

        </notescontext.Provider>
    )
}

export default NoteState
const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

router.get('/fetchNotes', fetchUser, async (req, res) => {
    try {
         const notes = await Notes.find({ user: req.user.id })
         res.json(notes)
     
    } catch (error) {

     console.error(error.message)
    res.status(500).send("Some errror Occured!")
     
    }
})
//ADDIG NEW NOTE AS A POST
router.post('/addNote', fetchUser, [body('title', 'Enter a valid title').isLength({ min: 3 }), body('description', 'Enter your description of atleast 5 letters').isLength({ min: 5 }),], async (req, res) => {
    
     try {
          
     
     const { title, description, tag } = req.body;

     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

     const notes = new Notes({
          title, description, tag, user: req.user.id
     })
     const savedNoted = await notes.save();
     res.json(savedNoted)
} catch (error) {
     console.error(error.message)
     res.status(500).send("Some errror Occured!")
}

})

//TO UPDATE AN EXISTING NOTE
router.put('/updateNote/:id', fetchUser, async (req, res) => {

     const {title,description,tag}=req.body;
     try{

     
     const newnote={};

     if(title){newnote.title=title}
     if(description){newnote.description=description}
     if(tag){newnote.tag=tag}

     let note= await Notes.findById(req.params.id)
     if(!note){
          return res.status(404).send("Not Found");
     }

     if(note.user.toString()!==req.user.id){
          return res.status(401).send("Not allowed");
     }

     note= await Notes.findByIdAndUpdate(req.params.id, {$set: newnote}, {new:true})

     res.json({note})
} catch(error){
     console.error(error.message)
     res.status(500).send("Some errror Occured!")
}

})

//DELETING A NOTE
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {

     try{

          let note= await Notes.findById(req.params.id)
          if(!note){
               return res.status(404).send("Not Found");
          }
          
          if(note.user.toString()!==req.user.id){
               return res.status(401).send("Not allowed");
          }
          
          note= await Notes.findByIdAndDelete(req.params.id)
          
          res.send("Success : Note has been deleted")
     } catch(errror){
          console.error(error.message)
          res.status(500).send("Some errror Occured!")
     }

})
module.exports = router
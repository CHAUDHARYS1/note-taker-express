// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).


const router = require('express').Router();
const { createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../data/db');

// GET /api/notes
router.get('/notes', (req, res) => {
    res.json(notes);
    console.log(notes);
});

// POST /api/notes
router.post('/notes', (req, res) => {

    req.body.id = notes.length.toString();    

    if(!validateNote(req.body)) {
        res.status(400).send('This note is not properly formated.');
    } else{
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

module.exports = router;
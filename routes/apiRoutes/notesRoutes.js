// GET /api/notes should read the db.json file and return all saved notes as JSON.
// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).


const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const {
    createNewNote,
    validateNote
} = require('../../lib/notes');
const notes = require('../../data/db');

// GET /api/notes
router.get('/notes', (req, res) => {
    fs.readFile(
        path.join(__dirname, '../../data/db.json'), (err, data) => {
            if (err) throw err;
            // console.log(data);
            const notes = JSON.parse(data);
            res.json(notes);
        });

    console.log(notes);
});

// POST /api/notes
router.post('/notes', (req, res) => {

    req.body.id = notes.length.toString();
    // console.log(req.body);
    if (!validateNote(req.body)) {
        res.status(400).send('This note is not properly formated.');
    } else {
        createNewNote(req.body).then(note => res.json(note));
    }
});

// DELETE a note
router.delete('/notes/:id', (req, res) => {
    let id = req.params.id;
    let notes = req.body;
    return this.notes(notes).then(notes => notes.filter((note) => note.id != id).then((filter) => createNewNote(filter)));
    
    // for (let index = 0; index < notes.length; index++) {
    //    if(notes[index].id === id){
    //        fs.writeFileSync(
    //            path.join(__dirname, '../../data/db.json')
    //        );
    //     }
    // }

});

module.exports = router;
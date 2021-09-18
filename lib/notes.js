const fs = require('fs');
const path = require('path');

function createNewNote(body){
    const note = body;
    fs.writeFileSync(
        path.join(__dirname, '../data/db.json')
    );
    return note;
}

function validateNote(note){
    if(!note.title || typeof note.title !== 'string'){
        return false;
    }
    if(!note.text || typeof note.text !== 'string'){
        return false;
    }
    return true;
}

module.exports = { createNewNote, validateNote };
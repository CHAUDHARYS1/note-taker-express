const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');

function createNewNote(body) {
    return new Promise((resolve, reject) => {

    const note = body;
    console.log(note);

    fs.readFile(
        path.join(__dirname, '../data/db.json'), (err, data) => {
            if (err) throw err;
            // console.log(data);
            const notes = JSON.parse(data);

            console.log(notes);
            notes.push(note);
            
            fs.writeFile(
                path.join(__dirname, '../data/db.json'), JSON.stringify(notes), (err) => {
                    if (err) throw err;
                    // console.log('The file has been saved!');
                    resolve(note);
                });
        });

    });
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

module.exports = {
    createNewNote,
    validateNote
};
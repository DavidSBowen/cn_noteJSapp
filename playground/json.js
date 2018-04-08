const fs = require('fs');

let originalNote = {
    title: 'Title Here',
    body: 'Body here'
};

let originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync(__dirname + '/notes.json', originalNoteString);

let noteString = fs.readFileSync(__dirname + '/notes.json');

let note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title, note.body);


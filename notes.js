const fs = require('fs');

const { readFile } = require('./supportFunctions/readFile');
const { writeFile } = require('./supportFunctions/writeFile');
const { deleteFile } = require('./supportFunctions/deleteFile');

let addNote = (title, body) => {
    let notes = [];
    let note = {
        title,
        body
    };

    try {
        readFile()
            .then(data => {
                if (typeof data === 'object') {
                    let match = false;
                    data.map(item => {
                        if (note.title.toLowerCase() === item.title.toLowerCase()) {
                            match = true;
                        }
                    })
                    if (match) {
                        return false;
                    } else {
                        data.push(note);
                        return data;
                    }
                } else {
                    return [note]
                }
            })
            .catch(err => {
                notes.push(note)
                return notes;
            })
            .then(newNotes => {
                if (newNotes) {
                    writeFile(newNotes);
                    console.log('New Note Added:');
                    console.log('Title:', note.title);
                    console.log('Body:', note.body);
                } else {
                    console.log('Duplicate entry.  This title already exists.')
                };
            })
            .catch(err => console.log(err))
    } catch (e) {
        try {
            writeFile(notes);
        } catch (f) {
            console.log('nope');
        }
    };
};

let getAll = () => {
    try {
        let storedFile = readFile()
            .then(data => {
                data.map(value => {
                    console.log('-Title:', value.title);
                    console.log('--Body:', value.body);
                });
            })
            .catch(err => console.log(err));
    } catch (e) {
        console.log(e);
    };
};

let getNote = (title) => {
    try {
        let storedFile = readFile()
            .then(data => {
                let requestedTitle = data.filter((value) => value.title.toLowerCase() === title.toLowerCase());
                requestedTitle = requestedTitle[0];
                console.log('Title:', requestedTitle.title);
                console.log('Body:', requestedTitle.body);
            })
            .catch(err => console.log(err));
    } catch (e) {
        console.log(e);
    };
};

let removeNote = (title) => {
    try {
        let match = false;
        let removedBody = '';
        readFile()
            .then(data => {
                return data.filter(note => {
                    if (title.toLowerCase() !== note.title.toLowerCase()) {
                        return note;
                    } else {
                        match = true;
                        removedBody = note.body
                    };
                });
            })
            .catch(err => console.log(err))
            .then(data => {
                writeFile(data);
                if (match) {
                    console.log('Note Deleted:');
                    console.log('Title:', title);
                    console.log('Body:', removedBody);
                } else {
                    console.log('Note not found');
                };
            })
            .catch(err => console.log(err));
    } catch (e) {
        console.log(e);
    };
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};
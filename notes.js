// console.log('starting notes.js');

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
                        console.log('2', data);
                        return data;
                    }
                } else {
                    return [note]
                }
            })
            .catch(err => {
                // console.log(err)
                notes.push(note)
                return notes;
            })
            .then(newNotes => {
                if (newNotes) {
                    writeFile(newNotes)
                } else {
                    console.log('Duplicate entry')
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
                let allFiles = data.map(value => {
                    return value;
                });
                console.log(allFiles);
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
        readFile()
            .then(data => {
                return data.filter(note => title.toLowerCase() !== note.title.toLowerCase());
            })
            .catch(err => console.log(err))
            .then(data => writeFile(data))
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
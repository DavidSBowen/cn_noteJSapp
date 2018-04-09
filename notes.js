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
        .catch(err => console.log(err))
        .then(newNotes => newNotes ? writeFile(newNotes) : console.log('Duplicate entry'))
        .catch(err => console.log(err))
};

let getAll = () => {
    let storedFile = readFile()
        .then(data => {
            let allFiles = data.map(value => {
                return value;
            });
            console.log(allFiles);
        })
        .catch(err => console.log(err));
};

let getNote = (title) => {
    let storedFile = readFile()
        .then(data => {
            let requestedTitle = data.filter((value) => value.title === title);
            requestedTitle = requestedTitle[0];
            console.log('Title:', requestedTitle.title);
            console.log('Body:', requestedTitle.body);
        })
        .catch(err => console.log(err));
};

let removeNote = (title) => {
    readFile()
        .then(data => {
            return data.filter(note => title.toLowerCase() !== note.title.toLowerCase());
        })
        .catch(err => console.log(err))
        .then(data => writeFile(data))
        .catch(err => console.log(err));
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};
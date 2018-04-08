// console.log('starting notes.js');

const fs = require('fs');

const { readFile } = require('./supportFunctions/readFile');
const { writeFile } = require('./supportFunctions/writeFile');

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
            data.map(a => {
                console.log(a);
            });
        })
        .catch(err => console.log(err));
};

let getNote = (title) => {
    let storedFile = readFile()
        .then(data => {
            let requestedTitle = data.filter((value, index) => {
                return value.title === title;
            });
            requestedTitle = requestedTitle[0]
            console.log('Title:', requestedTitle.title);
            console.log('Body:', requestedTitle.body);
        })
        .catch(err => console.log(err));
};

let removeNote = (title) => {
    console.log("Removing note:", title);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};
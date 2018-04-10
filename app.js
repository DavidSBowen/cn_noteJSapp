const fs = require('fs');
const _ = require('lodash');
const argv = require('yargs').argv;

const notes = require('./notes');
const titlePlease = 'Please enter a --title to read';
const titleBodyPlease = 'Please enter a --title and --body to add';

let command = argv._[0];

if (command === 'add') {
    (!argv.title || !argv.body) ? console.log(titleBodyPlease) : notes.addNote(argv.title, argv.body);
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'read') {
    !argv.title ? console.log(titlePlease) : notes.getNote(argv.title);
} else if (command === 'remove') {
    !argv.title ? console.log(titlePlease) : notes.removeNote(argv.title);
} else {
    console.log('Command not recognized.  Use: list, read, remove, add');
}
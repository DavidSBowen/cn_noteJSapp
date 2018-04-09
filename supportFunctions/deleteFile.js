const fs = require('fs');

const deleteFile = (notes) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('notes-data.json', JSON.stringify(notes), (err) => {

        })
    })
};

module.exports = {
    deleteFile
};
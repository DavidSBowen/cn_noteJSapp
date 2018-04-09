const fs = require('fs');

const writeFile = (notes) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(__dirname + '/../notes-data.json', JSON.stringify(notes), (err) => {
            if (err) {
                reject(err);
            } else {
                return resolve('Success');
            }
        });
    });
}

module.exports = {
    writeFile
};
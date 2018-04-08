const fs = require('fs');

const readFile = function () {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/../notes-data.json', 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                try {
                    resolve(JSON.parse(data));
                }
                catch (err) {
                    
                }
            }
        });
    });
};

module.exports = {
    readFile
};
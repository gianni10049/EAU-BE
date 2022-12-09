const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, './');

// Load Dir Paths
const loadSchemas = async () => {
    return fs.promises.readdir(directoryPath).then((files: string[]) => {
        let paths = [];

        for (let file of files) {
            if (file !== 'index.js') {
                paths.push('./schema/' + file);
            }
        }

        return paths;
    });
};

exports.loadSchemas = loadSchemas;

export {};
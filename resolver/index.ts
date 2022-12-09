const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, './');

// Create Resolvers
let resolvers: any = async () => {
    let paths = await loadPaths();

    for (let path of paths) {
        let schema_data = require('./' + path);

        Object.keys(schema_data).forEach((el) => {
            let type = el.split('_');
            let key = '';

            if (type[1]) {
                switch (type[1]) {
                    case 'query':
                        key = 'Query';
                        break;
                    case 'mutation':
                        key = 'Mutation';
                        break;
                    case 'account':
                        key = 'AccountConnected';
                        break;
                    case 'accountMutation':
                        key = 'AccountConnectedMutation';
                        break;
                }

                resolvers[key] = {
                    ...resolvers[key],
                    ...schema_data[el],
                };
            }
        });
    }

    return resolvers;
};

// Load Dir Paths
const loadPaths = async () => {
    return fs.promises.readdir(directoryPath).then((files: string[]) => {
        let paths = [];

        for (let file of files) {
            if (file !== 'index.js') {
                paths.push(file);
            }
        }

        return paths;
    });
};

exports.resolvers = resolvers;

export {};

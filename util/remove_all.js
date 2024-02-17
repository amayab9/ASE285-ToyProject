const { URI } = require('./_config.js');
const util = require('./mongodbutil0.js');
const { argv } = require('node:process');

const DATABASE = 'todoapp';
const POSTS = 'posts';
const COUNTER = 'counter';

if (argv.length > 2) {
    const action = 'delete';
    const fileName = argv[2];

    util.deleteDocuments(URI, DATABASE, POSTS, fileName);
    console.log(`Deleting documents from: ${fileName} in ${DATABASE}.${POSTS} collection...`);
} else {
    console.log('Can not delete');
}

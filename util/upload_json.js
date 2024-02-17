const {URI} = require('./_config.js');
const util = require('./mongodbutil0.js');
const { argv } = require('node:process');

const DATABASE = 'todoapp'; 
const POSTS = 'posts'; 
const COUNTER = 'counter'; 

// Call the function to remove all documents
/*(async () => {
  let res = util.readJSON('ase_courses.json');
  console.log(res);
  await util.uploadJSON(URI, DATABASE, COUNTER, 'ase_courses.json');
})();*/

if (argv.length > 2) {
  const action = 'add';
  const fileName = argv[2];

  util.uploadJSON(URI, DATABASE, COUNTER, fileName)
    .then(() => {
        console.log(`Uploaded to ${DATABASE}.${COUNTER} collection.`);
    })
    .catch(error => {
        console.error(`Error uploading JSON data: ${error}`);
    });
  console.log(`Uploaded  ${DATABASE}.${COUNTER} collection...`);
} else {
  console.log('Nothing to add.');
}

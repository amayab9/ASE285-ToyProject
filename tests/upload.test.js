const fs = require('fs');
const util = require('../util/mongodbutil0');
const uploadJSON = require('../util/upload_json');

jest.mock('../util/mongodbutil0', () => {
  return {
    readJSON: jest.fn(),
    uploadJSON: jest.fn(),
  };
});

describe("upload_json script", () => {
  it("should upload JSON data to MongoDB", async () => {
    const documents = {
      courses: [
        { name: 'Prof Y', department: 'Chemistry' },
        { name: 'Prof Z', department: 'Science' },
      ]
    };
    const uri = "mongodb+srv://bryanta21:aLCcEEys3OnKIwQA@cluster0.thal4vj.mongodb.net/?retryWrites=true&w=majority";
    const databaseName = 'todoapp';
    const collectionName = 'counter';

    util.readJSON.mockReturnValue(documents);
    require('../util/upload_json');
    expect(util.readJSON).toHaveBeenCalledWith('ase_courses.json');
    expect(util.uploadJSON).toHaveBeenCalledWith(uri, databaseName, collectionName, 'ase_courses.json');
  });
});

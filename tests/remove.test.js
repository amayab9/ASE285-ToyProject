const util = require('../util/mongodbutil0');

jest.mock('../util/mongodbutil0', () => {
  return {
    removeAllDocuments: jest.fn(),
  };
});

describe("remove_all script", () => {
  it("should remove all documents from MongoDB collections", () => {
    const uri = "mongodb+srv://bryanta21:aLCcEEys3OnKIwQA@cluster0.thal4vj.mongodb.net/?retryWrites=true&w=majority";
    const databaseName = 'todoapp';
    const postsCollection = 'posts';
    const counterCollection = 'counter';
    require('../util/remove_all');

    expect(util.removeAllDocuments).toHaveBeenCalledWith(uri, databaseName, postsCollection);
    expect(util.removeAllDocuments).toHaveBeenCalledWith(uri, databaseName, counterCollection);
  });
});

const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");
const util = require("../util/mongodbutil0");
const fs = require('fs');

describe("MongoDB Functions", () => {
  let connection;
  let db;
  let mongod;
  const collectionName = "courses";

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const URI = mongod.getUri();
    connection = await MongoClient.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db();

    await util.create(connection, db.databaseName, collectionName, { professor: 'Samuel Cho', department: 'Computer Science' });
    await util.create(connection, db.databaseName, collectionName, { professor: 'Professor X', department: 'Math' });
  });

  afterAll(async () => {
    await connection.close();
    await mongod.stop();
  });

  //create
  it("should create", async () => {
    const document = { professor: 'John Doe', department: 'Biology' };
    await util.create(connection, db.databaseName, collectionName, document);
    const result = await db.collection(collectionName).findOne(document);
    expect(result).toEqual(expect.objectContaining(document));
  });


  //read
  it("should read documents", async () => {
    const query = { professor: 'Professor X' };
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
    await util.read(connection, db.databaseName, collectionName, query);
    expect(consoleLogMock).toHaveBeenCalledWith('Found 1 documents');
    consoleLogMock.mockRestore();
  });

  //update
  it("should update", async () => {
    const query = { professor: 'Samuel Cho' };
    const update = { $set: { department: 'Software Engineering' } };
    await util.update(connection, db.databaseName, collectionName, query, update);
    const updatedDocument = await db.collection(collectionName).findOne(query);
    expect(updatedDocument.department).toEqual('Software Engineering');
  });

  //readJSON
  it("should readJSON", () => {
    const readFileSyncMock = jest.spyOn(fs, 'readFileSync').mockReturnValue('{"name": "John", "age": 30}');
    const result = util.readJSON('test.json');
    expect(readFileSyncMock).toHaveBeenCalledWith('test.json', 'utf8');
    expect(result).toEqual({ name: 'John', age: 30 });
    readFileSyncMock.mockRestore();
  });

  
});


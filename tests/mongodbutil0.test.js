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

  it("should create", async () => {
    const document = { professor: 'John Doe', department: 'Biology' };
    await util.create(connection, db.databaseName, collectionName, document);
    const result = await db.collection(collectionName).findOne(document);
    expect(result).toEqual(expect.objectContaining(document));
  });


  //read

  it("should update", async () => {
    // Define the query to find the document to update
    const query = { professor: 'Samuel Cho' };

    // Define the update operation
    const update = { $set: { department: 'Software Engineering' } };

    // Call the update function
    await util.update(connection, db.databaseName, collectionName, query, update);

    // Verify if the document has been updated
    const updatedDocument = await db.collection(collectionName).findOne(query);
    expect(updatedDocument.department).toEqual('Software Engineering');
  });

  
});


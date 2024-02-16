const { connect, create, read, delete_document } = require('../util/mongodbutil');
const util = require('../util/mongodbutil');

describe('MongoDB', () => {
  let connection;
  let db;
  const URI = globalThis.__MONGO_URI__;
  const databaseName = globalThis.__MONGO_DB_NAME__;
  const collectionName = 'courses';

  beforeAll(async () => {
    connection = await util.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db(databaseName);

    await util.create(URI, databaseName, collectionName, { professor: 'Samuel Cho', department: 'Computer Science' });
    await util.create(URI, databaseName, collectionName, { professor: 'Professor X', department: 'Math' });
  
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should connect to MongoDB database', async () => {
    const client = await connect(URI);
    expect(client).toBeDefined();
    await client.close();
  });

  it('should CREATE document', async () => {
    const document = { name: 'Test Document', value: 123 };
    const result = await create(URI, databaseName, collectionName, document);
    expect(result).toBeDefined();
  });

  it('should READ document', async () => {
    const query = { department: 'Computer Science' }; 
    const documents = await read(URI, databaseName, collectionName, query);
    expect(documents.length).toBeGreaterThanOrEqual(1); 
    const documentNames = documents.map(doc => doc.professor);
    expect(documentNames).toContain('Samuel Cho'); 
  });

  it('should UPDATE document', async () => {
    const query = { professor: 'Professor X' }; 
    const update = { $set: { department: 'Art' } };
    const result = await util.update(URI, databaseName, collectionName, query, update);
    expect(result.modifiedCount).toBe(1);
  });

  it('should DELETE document', async () => {
    const query = { professor:"Samuel Cho" };
    const result = await delete_document(URI, databaseName, collectionName, query);
    expect(result.deletedCount).toBe(1);
  });

});

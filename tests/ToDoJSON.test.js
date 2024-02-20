const { MongoClient } = require('mongodb');

describe('Database Tests', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb+srv://bryanta21:aLCcEEys3OnKIwQA@cluster0.thal4vj.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
    });
    db = await connection.db('todoapp');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should query data from the database', async () => {
    const collection = db.collection('posts'); 
    const documents = await collection.find().toArray();
    
    expect(documents).toContainEqual({ _id: 2, title: 'csac', date: 'aqc' });
    expect(documents).toContainEqual({ _id: 3, title: 'cs', date: 'cs' });
  });
  
});

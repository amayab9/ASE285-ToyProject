const http = require('http');

describe('/json', () => {
  it('should return JSON objects', (done) => {
    const url = 'http://localhost:5500/json';

    const req = http.get(url, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(responseData);

          expect(Array.isArray(jsonData)).toBeTruthy();

          done();
        } catch (error) {
          done(error);
        }
      });
    });

    req.on('error', (error) => {
      done(error);
    });
  });
});

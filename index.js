const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');
const path = '/var/www/services/';

let services = { services: ["Services"] };

app.set('json spaces', 2);

app.all(['/', '/index'], (req, res) => {
  fs.readdir(path, { withFileTypes: true }, (err, items) => {
    if (err) {
      res.status(500).json({ status: 'error', message: 'Something went wrong!' });
      return;
    }

    const services = items
      .filter(item => item.isDirectory())
      .map(dir => dir.name);

    res.json({ services });
  });
  //res.json(services);
});

app.get('/index-error-test', (req, res) => {
  throw new Error('This is a test error!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

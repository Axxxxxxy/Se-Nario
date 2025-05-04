// app.js

const express = require('express');
const bodyParser = require('body-parser');
const dialogflowHandler = require('./handlers/dialogflowHandler');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use('/', dialogflowHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

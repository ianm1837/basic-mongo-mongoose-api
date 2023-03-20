const express = require('express');
const db = require('./config/dbConnection');
const routes = require('./routes');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

console.clear()
console.log('Connecting to MongoDB...');

db.once('open', () => {
  app.listen(process.env.PORT, () => {
    console.clear()
    console.log(` 🚀 API server running on port ${process.env.PORT}!`);
  });
})
.on('error', (error) => {
  console.log('Error: ', error.message);
  process.exit(1);
});

const { connect, connection, set } = require('mongoose');
require('dotenv').config();

set('strictQuery', true);

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

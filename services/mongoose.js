require('dotenv').config();
const mongoose = require('mongoose');

function connect() {
  mongoose.set('strictQuery', true);

  // connect to database
  mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // check connection status to database
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Connected to database!');
  });
}

module.exports = {
  connect: connect
}

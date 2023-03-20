const mongoose = require('mongoose');
const config = require('config');

const db = config.get('MONGO_URI');

async function connectDB() {
  console.log(db);
  try {
    //   // "MONGO_URI": "mongodb+srv://talhamunir720:03436885953@investme-cluster.dtnwgfb.mongodb.net/?retryWrites=true&w=majority",

    await mongoose.connect(db);

    console.log('MONGO DB CONNECTED...');
  } catch (error) {
    console.log('===>', error.message);
    //   Exit process with failure
    process.exit(1);
  }
}

module.exports = connectDB;

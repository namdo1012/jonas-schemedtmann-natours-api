const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

// Connect Mongoose
const dbString = process.env.DB_STRING.replace(
  '<password>',
  process.env.DB_PASSWORD
);

mongoose
  .connect(dbString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection succesful!');
  });

// Read data file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)
);

// Import data to DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Database successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Database deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Run function
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

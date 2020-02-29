const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour need for name field'],
    trim: true,
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour need for price field']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

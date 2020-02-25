const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          newTour
        }
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const TourID = req.params.id * 1;
  const tourChange = tours.find(el => TourID === el.id);
  if (!tourChange) {
    res.send('ID not found!');
  }
  console.log(tourChange);
});

module.exports = app;

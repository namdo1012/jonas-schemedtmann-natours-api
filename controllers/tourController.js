const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.createNewTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  // Push new tour to tours
  tours.push(newTour);

  //Write new tour to file
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      if (err) throw err;
    }
  );

  res.status(201).json({
    status: 'succes',
    data: {
      newTour
    }
  });
};

exports.updateTour = (req, res) => {
  const TourID = req.params.id * 1;
  const tourChange = tours.find(el => TourID === el.id);
  if (!tourChange) {
    res.send('ID not found!');
  }
  console.log(tourChange);
};

exports.deleteTour = (req, res) => {
  const TourID = req.params.id * 1;

  // Delete tour from tours array
  const idx = tours.findIndex(el => el.id === TourID);
  if (idx === -1) {
    return res.send('ID not found!');
  }
  tours.splice(idx, 1);

  // Update tours-simple.js file
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      if (err) throw err;
    }
  );
  res.status(200).send({
    status: 'success',
    data: null
  });
};

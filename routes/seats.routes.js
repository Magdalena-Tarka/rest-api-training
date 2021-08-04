const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

const getElementFromLink = (req) => (
  db.seats.find(element => element.id === parseInt(req.params.id))
);
  
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(getElementFromLink(req));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const newElement = { id: uuidv4(), day: day, seat: seat, client: client, email: email };
  if(db.seats.some(item => (item.day == day && item.seat == seat))) {
    res.status(404).json( { message: 'The slot is already taken...' } )
  } else {
    db.seats.push(newElement);
    res.json( { message: 'OK' } );
  }
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const updatedElement = ({ id: req.params.id, day: day, seat: seat, client: client, email: email });
  db.seats[db.seats.indexOf(getElementFromLink(req))] = updatedElement;
  res.json( { message: 'OK' } );
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(db.seats.indexOf(getElementFromLink(req)), 1);
  res.json( { message: 'OK' } );
});

module.exports = router;
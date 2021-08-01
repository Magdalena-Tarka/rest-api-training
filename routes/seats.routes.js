const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

const getSeatFromLink = (req) => (
  db.seats.find(seat => seat.id === parseInt(req.params.id))
);
  
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(getSeatFromLink(req));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const newSeat = { id: uuidv4(), day: day, seat: seat, client: client, email: email };
  db.seats.push(newSeat);
  res.send( { message: 'OK' } );
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  getSeatFromLink(req).day = day;
  getSeatFromLink(req).seat = seat;
  getSeatFromLink(req).client = client;
  getSeatFromLink(req).email = email;
  res.send( { message: 'OK' } );
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(db.seats.indexOf(getSeatFromLink(req)), 1);
  res.send( { message: 'OK' } );
});

module.exports = router;
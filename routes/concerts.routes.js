const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

const getConcertFromLink = (req) => (
  db.concerts.find(concert => concert.id === parseInt(req.params.id))
);
  
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(getConcertFromLink(req));
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const newConcert = { id: uuidv4(), performer: performer, genre: genre, price: price, day: day, image: image };
  db.concerts.push(newConcert);
  res.send( { message: 'OK' } );
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  getConcertFromLink(req).performer = performer;
  getConcertFromLink(req).genre = genre;
  getConcertFromLink(req).price = price;
  getConcertFromLink(req).day = day;
  getConcertFromLink(req).image = image;
  res.send( { message: 'OK' } );
});

router.route('/concerts/:id').delete((req, res) => {
  db.concerts.splice(db.concerts.indexOf(getConcertFromLink(req)), 1);
  res.send( { message: 'OK' } );
});

module.exports = router;
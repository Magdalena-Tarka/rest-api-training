const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

const getElementFromLink = (req) => (
  db.testimonials.find(element => element.id === parseInt(req.params.id))
);
  
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(getElementFromLink(req));
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const newElement = { id: uuidv4(), author: author, text: text };
  db.testimonials.push(newElement);
  res.json( { message: 'OK' } );
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const updatedElement = ({ id: req.params.id, author: author, text: text });
  db.testimonials[db.testimonials.indexOf(getElementFromLink(req))] = updatedElement;
  res.json( { message: 'OK' } );
});

router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials.splice(db.testimonials.indexOf(getElementFromLink(req)), 1);
  res.json( { message: 'OK' } );
});

module.exports = router;
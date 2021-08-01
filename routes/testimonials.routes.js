const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

const getTestimonialFromLink = (req) => (
  db.testimonials.find(testimonial => testimonial.id === parseInt(req.params.id))
);
  
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(getTestimonialFromLink(req));
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const newTestimonial = { id: uuidv4(), author: author, text: text };
  db.testimonials.push(newTestimonial);
  res.send( { message: 'OK' } );
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  getTestimonialFromLink(req).author = author;
  getTestimonialFromLink(req).text = text;
  res.send( { message: 'OK' } );
});

router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials.splice(db.testimonials.indexOf(getTestimonialFromLink(req)), 1);
  res.send( { message: 'OK' } );
});

module.exports = router;
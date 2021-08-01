const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(cors());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'John Rambo', text: 'Our office has a great atmosphere…' },
  { id: 4, author: 'Elton John', text: 'I feel very proud to be one of the oldest employee' },
  { id: 5, author: 'John Travolta', text: 'They gave me this opportunity to grow' },
  { id: 6, author: 'Katty Srerry', text: 'I will always be thankful to the people in this company' },
  { id: 7, author: 'Barak Obama', text: 'We work as a family.' },
  { id: 8, author: 'Tina Turner', text: 'A brilliant opportunity for anyone' },
  { id: 9, author: 'Amanda Thomson', text: 'I feel like part of something bigger' },
  { id: 10, author: 'Julia Roberts', text: 'It is a company that offers you diverse professional experience' },
];

const getTestimonialFromLink = (req) => (
  db.find(testimonial => testimonial.id === parseInt(req.params.id))
);

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(getTestimonialFromLink(req));
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const newTestimonial = { id: uuidv4(), author: author, text: text };
  db.push(newTestimonial);
  res.send( { message: 'OK' } );
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  getTestimonialFromLink(req).author = author;
  getTestimonialFromLink(req).text = text;
  res.send( { message: 'OK' } );
});

app.delete('/testimonials/:id', (req, res) => {
  db.splice(db.indexOf(getTestimonialFromLink(req)), 1);
  res.send( { message: 'OK' } );
});

app.use((req, res) => {
    res.status(404).send( { message: 'Not found....' } );
  })

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
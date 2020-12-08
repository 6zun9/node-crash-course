const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

// db connection
const dbURI =
  'mongodb+srv://6zun9:Password@node-crash-course.3na4l.mongodb.net/node-crash-course?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err, 'error'));

//register ejs
app.set('view engine', 'ejs');
app.set('views', 'templates');

// use third party middleware morgan for logger
// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes

// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'about new blog',
//     body: 'more about my new blog',
//   });
//   blog
//     .save()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// app.get('/single-blog', (req, res) => {
//   Blog.findById('5fcf22b501e7a42ec176e965')
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

//listen requests
// app.get('/', (req, res) => {
//   // res.send('<p>HOME PAGE</p>');
//   res.sendFile('./views/index.html', { root: __dirname });
// });

// app.get('/', (req, res) => {
//   res.render('index');
// });

// app.get('/about', (req, res) => {
//   res.sendFile('./views/about.html', { root: __dirname });
// });

// //redirects
// app.get('/about-us', (req, res) => {
//   res.redirect('/about');
// });

// // use always stays at last after listeing to all the requestes
// app.use((req, res) => {
//   res.status(404).sendFile('./views/404.html', { root: __dirname });
// });

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//blog based routes
app.use('/blogs', blogRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

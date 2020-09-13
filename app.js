require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const routes=require('./routes/authRoutes')
var cookieParser = require('cookie-parser')
const { requireAuth,checkUser }=require('./middelware/authMidelleaware')
const app = express();

const port=process.env.PORT || 3000

// middleware
app.use(express.static('public'));
app.use(express.json()); //instead of body parser
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.MONGO_DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(routes)
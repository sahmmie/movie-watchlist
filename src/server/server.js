const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

// Local environment variables
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').load();
}

// Mongoose
mongoose.connect(`mongodb://${process.env.dbuser}:${process.env.dbpassword}@${process.env.dbhost}:${process.env.dbport}/${process.env.database}`);
mongoose.Promise = global.Promise;

// Parsers
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use('local-signup', require('./passport/local-signup'));
passport.use('local-login', require('./passport/local-login'));

// Static files
app.use(express.static(path.join(__dirname, '../../dist')));

// Middleware
app.use('/api', require('./middleware/auth-check'));

// Routes
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/views'));

// Error handling
app.use(function(err, req, res, next) {
	console.log(err.message);
	res.status(500).send({"Error" : err.message});
});

let port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log(`Server running on port ${port}`);
});
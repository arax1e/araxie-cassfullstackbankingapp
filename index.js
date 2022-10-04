//tutorial for the api: https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/
//left off after making the first post request

require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(express.json());


var cors = require('cors');
const res = require('express/lib/response');
const routes = require('./routes/routes');
app.use('/api', routes)


//used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());


//var port = 3000;
app.listen(process.env.PORT || 3000);
console.log('Running');
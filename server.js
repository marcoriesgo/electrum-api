const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path')

const methodOverride  = require('method-override');

const users = require("./routes/api/users");
const plaid = require("./routes/api/plaid");
const expenses = require("./routes/api/expenses");
const budgets = require("./routes/api/budgets");
const bills = require("./routes/api/bills");
const investments = require("./routes/api/investments");
const app = express();

const db = mongoose.connection;

const PORT = process.env.PORT || 5000;

// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `YOUR DATABASE NAME`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


// DB Config
// const db = require("./config/keys").mongoURI;


// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  //use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


// Passport middleware
app.use(passport.initialize());


// Passport config
require("./config/passport")(passport);


// Routes
app.use("/api/users", users);
app.use("/api/plaid", plaid);
app.use("/api/expenses", expenses);
app.use("/api/budgets", budgets);
app.use("/api/bills", bills);
app.use("/api/investments", investments);


app.listen(PORT, () => console.log(`Server running on port ${PORT} !`));
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const plaid = require("./routes/api/plaid");
const expenses = require("./routes/api/expenses");
const budgets = require("./routes/api/budgets");
const bills = require("./routes/api/bills");
const investments = require("./routes/api/investments");

const app = express();

const port = process.env.PORT || 5000; // process.env.port is Heroku's port


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ `marco_electrum`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Use a simple term for mongoose.connection for accessibility:
const db = mongoose.connection;

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});


// // CORS middleware:
// const whitelist = [
//     "*",
// ];
//   const corsOptions = {
//     origin: function(origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     }
//   };
// app.use(cors(corsOptions));

app.use(cors())

// DB Config
// const db = require("./config/keys").mongoURI;

// // Connect to MongoDB
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));


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


app.listen(port, () => console.log(`Server running on port ${port} !`));
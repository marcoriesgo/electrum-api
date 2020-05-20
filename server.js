const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const plaid = require("./routes/api/plaid");
const expenses = require("./routes/api/expenses");
const budgets = require("./routes/api/budgets");
const bills = require("./routes/api/bills");

const app = express();


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


// DB Config
const db = require("./config/keys").mongoURI;


// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


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

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server running on port ${port} !`));
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport=require('passport');
const bodyParser=require('body-parser')
const users = require("./routes/api/users");
const path= require('path');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
const userRoute=require('./routes/user');
const exRoute=require('./routes/ex');

app.use('/users',userRoute);
app.use('/exs',exRoute);
//REGISTRATION & LOGIN
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
  // app.get('*', function(req, res) {
  //   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  // });
}


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

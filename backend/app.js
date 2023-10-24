const session  = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const cors  = require("cors");
require('./Config/connect');
const app = express();

// const {???} = require ('???')

// Thiết lập body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 


//session 
app.use(session({
  secret: 'keysaveloginuser123456', 
  resave: false,
  saveUninitialized: false
}));
// app.use(cookieParser()); //Parse cookie
app.use(cors());

app.use(express.json());

// Định tuyến
//app.use(???);

app.use(express.static("uploads"));

const port = 3000;
app.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});

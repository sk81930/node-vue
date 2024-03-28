require('dotenv').config();
const express = require('express');
const cors = require('cors');
const formData = require('express-form-data');

let dbConfig = require(`./config/connection.js`);


let indexRoute = require('./routes/index.js');
let authRoute = require('./routes/account/auth.js');
let userRoute = require('./routes/account/user.js');
let projectRoute = require('./routes/project/project.js');
let taskRoute = require('./routes/task/task.js');

var app = express();

app.use(cors());
app.use(express.json());   
app.use(express.urlencoded({extended: true})); 
app.use(formData.parse());


app.use(function(req, res, next) {
  	res.header('server', '*');
 	next();
});

// Routes
app.use("/",indexRoute);
app.use("/auth",authRoute);
app.use("/user",userRoute);
app.use("/project",projectRoute);
app.use("/task",taskRoute);

var listener = app.listen(process.env.PORT || 9001, function () {
   let _msgg = `Server listening on port: ${listener.address().port} with config: ${process.env.NODE_ENV}`;
  	console.log(_msgg)
});
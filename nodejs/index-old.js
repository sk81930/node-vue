require('dotenv').config();
const express = require('express');
const cors = require('cors');
const formData = require('express-form-data');
const bodyParser = require("body-parser")
var app = express();
var http = require('http').createServer(app);

const socketControllerClass = require('./controllers/socketController.js');

const MiddlewareClass = require('./middleware');

let Middleware = new MiddlewareClass;






var io = require('socket.io')(http);

io.on("connection", socket =>{
    console.log("connected", socket.id)

    socket.on("join", roomName =>{
       var rooms = io.sockets.adapter.rooms;
       var room = rooms.get(roomName);
       if(room == undefined){
          socket.join(roomName);
          console.log("room created", roomName)
          socket.emit("created");
       }else if(room.size == 1){
           socket.join(roomName);
           console.log("room joined", roomName)
           socket.emit("joined");
       }else{
           console.log("room fulled", roomName)
           socket.emit("full");
       }
    });

    socket.on("ready", roomName =>{
       console.log("room ready", roomName)
       socket.broadcast.to(roomName).emit("ready");
    });

    socket.on("candidate", (candidate, roomName) =>{
       console.log("candidate", candidate)
       socket.broadcast.to(roomName).emit("candidate", candidate);
    });

    socket.on("offer", (offer, roomName) =>{
       console.log("offer", offer)
       socket.broadcast.to(roomName).emit("offer", offer);
    });

    socket.on("answer", (answer, roomName) =>{
       console.log("answer", answer)
       socket.broadcast.to(roomName).emit("answer", answer);
    });

    socket.on("leave", (roomName) =>{
       socket.leave(roomName);
       socket.broadcast.to(roomName).emit("leave");
    });
});

/*io.use(Middleware.socketAuth);

let socket = new socketControllerClass;

socket.connection(io);*/


let dbConfig = require(`./config/connection.js`);

let indexRoute = require('./routes/index.js');
let authRoute = require('./routes/account/auth.js');
let userRoute = require('./routes/account/user.js');
let projectRoute = require('./routes/project/project.js');
let taskRoute = require('./routes/task/task.js');
let chatRoute = require('./routes/chat/chat.js');

app.use(express.static('public'));

app.use(cors());
app.use(express.json());   
app.use(express.urlencoded({extended: false})); 
app.use(formData.parse());

app.use(bodyParser.urlencoded({extended: false}))


app.use(function(req, res, next) {
  	res.header('server', '*');
 	next();
});

app.use(function(req, res, next) {
   req.rootUrl = function() {
      return req.protocol + "://" + req.get('host');
   }
   return next();
});

app.set("view engine", "ejs")
app.set("views", "./views")
// Routes
app.use("/",indexRoute);
app.use("/auth",authRoute);
app.use("/user",userRoute);
app.use("/project",projectRoute);
app.use("/task",taskRoute);
app.use("/chat",chatRoute);

var listener = http.listen(process.env.PORT || 9001, function () {
   let _msgg = `Server listening on port: ${listener.address().port} with config: ${process.env.NODE_ENV}`;
  	console.log(_msgg)
});
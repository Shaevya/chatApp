// const io = require('socket.io')(5000)
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { createFile, saveDataToTheFile, validateUser, validateUserDummy, getUserById } = require("./fileHelper");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


createFile();

io.on('connection', socket => {
    const query = socket.handshake.query;
    const id = query.id;

    socket.join(id);
    console.log("UserId Connected : " + id);
    
    socket.on("send-message", ({ recipients, picture, text, groupName }) => onSendMessage(recipients, picture, text, groupName, id, socket));
    //#region  old code
    // socket.on("send-message", ({ recipients, text }) => {
    //   recipients.forEach(recipient => {
    //     const newRecipients = recipients.filter( r => r !== recipient);
    //     newRecipients.push(id);
    //     socket.broadcast.to(recipient).emit('receive-message', 
    //     { 
    //       recipients: newRecipients,
    //       sender: id,
    //       text 
    //     })
    //   })
    // });
    //#endregion

    socket.on("login", (emaiId) => onLogin(emaiId, socket, id));

    socket.on("save-user", (user, cb) => {
      console.log("In Save user : " + user);
      saveDataToTheFile(JSON.parse(user), (args) => {
        if(cb) cb({...args});
      });
      
    });

    socket.on("get-user-by-id", (id, cb) => {
      console.log("In Get User by Id : " + id);
      getUserById(id, (args) => {
        console.log("In Get User by Id Callback : " + id);
        console.log("args : " + JSON.stringify(args));
        if(cb) cb({...args});
      });
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", id);
    });
});

function onSendMessage(recipients, picture, text, groupName, id, socket){
  recipients.forEach(recipient => {
    const newRecipients = recipients.filter( r => r !== recipient);
    newRecipients.push(id);
    socket.broadcast.to(recipient).emit('receive-message', 
    { 
      recipients: newRecipients,
      picture: picture,
      sender: id,
      text,
      groupName
    })
  })
}

function onLogin(emaiId, socket, id){
  
  validateUser(emaiId, (_user) => {

    const user = {
      id: _user?.id || id,
      emailId: _user?.emailId || '',
      name: _user?.name || '',
      designation: _user?.designation || 'NA',
      picture: _user?.picture || null
    }

    console.log("validation complete for user : " + JSON.stringify(user));

    socket.emit('confirm-login', {...user});
  });
}

server.listen(5000, () => {
  console.log("SERVER RUNNING");
});
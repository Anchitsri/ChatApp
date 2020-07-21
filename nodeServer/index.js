//Node Server which will handle socket io connections
const io=require('socket.io')(8000);
const users={};

io.on('connection',socket=>{
        //If any new user joins ,let other user connected to the server know! 
        socket.on('new-user-joined' ,name=>{  
            users[socket.id]=name;
            socket.broadcast.emit('user-joined',name);
        })
        //If someone sends a message ,broadcast it to the people
        socket.on('sends',message=>{
            socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
        })
        //If someone leaves the chat ,let others know 
        socket.on('disconnect',message=>{   //here disconnect is predefined
            socket.broadcast.emit('left',users[socket.id]);
            delete users[socket.id];
        })
})
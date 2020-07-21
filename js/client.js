const socket=io('http://localhost:8000');  //This will connect client to the server

//Get Dom element in respective JS variable
const form =document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");

//Audio that will play on receiving messages
var audio=new Audio('ting.mp3');
var audio1=new Audio('pristine.mp3');
//Function which will append event info  to the container
const append2=(message,position)=>{
       const messageElement=document.createElement('div');
       messageElement.innerText=message;
       messageElement.classList.add('message');
       messageElement.classList.add(position);
       messageContainer.append(messageElement); //This append will add messageElement
       if(position=='left')
       audio.play();
       if(position=='center')
       audio1.play();
    messageContainer.scrollTop=messageContainer.scrollHeight;  //to make autoscroll
    }

//Ask new user for his/her name and let the server know
const name=prompt("Enter Your Name to join");
socket.emit('new-user-joined',name);

//If a new user joins,receive his/her name from the server and append it in container
socket.on('user-joined',name=>{
    append2(`${name} joined the chat`,'center');
});

//If the form gets submitted ,send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();    //  stop reloading
    const message =messageInput.value;
    append2(`You :${message}`,'right');
    socket.emit('sends',message);
    messageInput.value='';
  })

//If server sends a message,receive it 
socket.on('receive',data=>{
    append2(`${data.name}: ${data.message}`,'left');
});

//If a user leaves the chat, append the info to the container
socket.on('left',name=>{
    append2(`${name} left the chat`,'center');
})


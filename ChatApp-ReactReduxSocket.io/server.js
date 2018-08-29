//var app = require('http').createServer(handler),
const http = require('http');
const express = require('express');
const uuidV4 = require('uuid/v4');
var dateFormat = require('dateformat');
//io = require('socket.io').listen(app),
//fs = require('fs'),
//redis = require('redis');
const socketServer = require('socket.io')

const app = express();
app.listen(3002);
var server = http.createServer(app);
var io = socketServer(server);
server.listen(3001,()=> {console.log("+++Gethyl Express Server with Socket Running!!!")})
/***************************************************************************************** */
/* Socket logic starts here																   */
/***************************************************************************************** */
const connections = [];
const userList = [];
const chatRoomList = [];
io.on('connection', function (socket) {
	console.log("New Client Connected to Socket!!"+ socket.id)
	//console.log('Sending the ChatRoom List');
	//socket.emit('currentChatRoomList',chatRoomList)
	socket.on('disconnect', function(){
		console.log('Disconnected - '+ socket.id);
	});

	socket.on('newUser',(name)=>{
		const userId = uuidV4();
		const user = {'id': userId, 'name':''+name, 'time':dateFormat(new Date(), "ddd h:MM:ss"), 'type':'USER', 'newMessage':false, 'show':true};
		socket.emit('myDetails',user);
		socket.emit('chatRoomList',chatRoomList);
		socket.emit('userList',userList);
		io.emit('user', user);
		userList.push(user);
		connections[userId] = socket;
	});

	socket.on('newChatRoom',(roomName)=>{
		const chatRoomId = uuidV4();
		const chatRoom = {'id': chatRoomId, 'name':''+roomName, 'time':dateFormat(new Date(), "ddd h:MM:ss"), 'type':'CHAT_ROOM', 'newMessage':false, 'show':true};
		userList.push(chatRoom);
		io.emit('chatroom',chatRoom)
	});

	socket.on('message',(message)=>{
		//users.push(newUser);
		message.time = dateFormat(new Date(), "ddd h:MM:ss");
		console.log('SOCKET :: Received Message :', message);
		io.emit('message',message);
		//socket.emit('message',message);
		//if(connections[message.toId]){
		//	connections[message.toId].emit('message',message);
		//}

	});

});

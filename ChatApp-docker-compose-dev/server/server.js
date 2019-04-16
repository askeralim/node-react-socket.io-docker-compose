const app = require('express')();
const http = require('http').Server(app);
var io = require('socket.io')(http);
const express = require('express');
const uuidV4 = require('uuid/v4');
var dateFormat = require('dateformat');
http.listen(3001,()=> {console.log("Express Server with Socket.io Running!!!")})

/***************************************************************************************** */
/* Redis code goes here															   */
/***************************************************************************************** */
const redis = require('redis');
const redisClient = redis.createClient(6379,'redis');
const publisher = redis.createClient(6379,'redis');
const subscriber = redis.createClient(6379,'redis');
redisClient.set("chatRoomList",[],function(err,reply){});

subscriber.on('message', function(channel, object) {
	io.emit(channel, JSON.parse(object));
});
subscriber.subscribe('message','user','chatroom');

/***************************************************************************************** */
/* Socket logic starts here																   */
/***************************************************************************************** */
io.on('connection', function (socket) {
  console.log("CONENCTING SOCKET :");
	socket.on('disconnect', function(){
		if(socket.user){
			redisClient.lrem("chatRoomList",-1, socket.user);
		}
	});
	//While Joining The user gets All UsersList which Includes All Users and Chat Rooms
	socket.on('newUser',(userObj)=>{
    console.log("NEW USER :"+JSON.stringify(userObj));
		const userId = userObj.name;//uuidV4();
		const user = {'id': userId, 'name':''+userObj.name, 'time':dateFormat(new Date(), "ddd h:MM:ss"), 'type':'USER', 'newMessage':false, 'show':true};
		socket.emit('myDetails',user);
		let userObjStr = JSON.stringify(user);
		//socket.emit('chatRoomList',chatRoomList);
		redisClient.lrange("chatRoomList", 0, -1, function(err, list){
			list = list.map(user=>JSON.parse(user));
			socket.user = userObjStr;
			console.log("Sending Chat Room List :"+JSON.stringify(list));
			socket.emit('userList',list);
			redisClient.rpush("chatRoomList",userObjStr);
		});
		//console.log("Publish user :"+JSON.stringify(userObjStr));
		publisher.publish('user', userObjStr);
	});

	socket.on('newChatRoom',(roomName)=>{
		const chatRoomId = roomName;//uuidV4();
		const chatRoom = {'id': chatRoomId, 'name':''+roomName, 'time':dateFormat(new Date(), "ddd h:MM:ss"), 'type':'CHAT_ROOM', 'newMessage':false, 'show':true};
		let chatRoomObj = JSON.stringify(chatRoom);
		redisClient.rpush("chatRoomList",chatRoomObj);
		publisher.publish('chatroom', chatRoomObj);
	});
	//Whenevr any message receives It publish to all, it wil be filtered in the client side.
	socket.on('message',(message)=>{
		//console.log("Message : "+JSON.stringify(message))
		message.time = dateFormat(new Date(), "ddd h:MM:ss");
		publisher.publish('message', JSON.stringify(message));
	});
});

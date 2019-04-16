import socket from "../components/socket.js"

export const SEARCH_CHATROOM = 'SEARCH_CHATROOM';
export const CHAT_ROOM_SELECTED = 'CHAT_ROOM_SELECTED';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CHAT_ROOM_LIST = "CHAT_ROOM_LIST";
export const USER_LIST="USER_LIST";
export const CHAT_SERVER_LOGIN = 'CHAT_LOGIN';
export const LOGGED_IN_USER = 'LOGGED_IN_USER';
export const NEW_USER = 'NEW_USER';
export const NEW_CHAT_ROOM = 'NEW_CHAT_ROOM';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const CHAT_PERSON_TYPE_USER='USER';
export const CHAT_PERSON_TYPE_CHAT_ROOM='CHAT_ROOM';
export const CURRENT_CHAT_ROOM_LIST='CURRENT_CHAT_ROOM_LIST';

export const searchChatRoom = (search) => {
  return {
    type:SEARCH_CHATROOM,
    payload:search
  };
}

export const selectChatRoom =(chatRoom) =>{
  return {
    type:CHAT_ROOM_SELECTED,
    payload:chatRoom
  };
}

export const selectChatRoomDispatcher =  (chatRoom) =>{
	return (dispatch) => {
		   dispatch(selectChatRoom(chatRoom));
  };
}

export const sendChatMessage =(message)=>{
  return {
    type:SEND_MESSAGE,
    payload:message
  };
}
//chatType USER/CHAT_ROOM
export const sendChatMessageAction = (message, fromId, toId, recepientType, fromName, toName) => {
  //console.log('Sending Message : ', message);
   return (dispatch) => {
     socket.emit('message', {message, fromId, toId, recepientType, fromName, toName});
   }
}

/* Used only by actions for sockets */
export const usersListAction = (res) => ({
	type: USER_LIST,
	payload: res
})

export const loginUserAction = (res) => ({
	type: LOGGED_IN_USER,
	payload: res
})
export const newUserAction = (res) => ({
	type: NEW_USER,
	payload: res
})

export const newChatRoomAction = (res) => ({
	type: NEW_CHAT_ROOM,
	payload: res
})

export const newMessageAction = (res) =>{
    return (dispatch, getState) => {
      const { loggedInUser,activeChatRoom } = getState();
      if((CHAT_PERSON_TYPE_CHAT_ROOM == res.recepientType) ||
          (CHAT_PERSON_TYPE_USER == res.recepientType && (loggedInUser.get('id') == res.toId || loggedInUser.get('id') == res.fromId )))
        dispatch({
          type: NEW_MESSAGE,
          payload: res,
          activeChatRoom
        });
    };
}
export const createChatRoom = (socket, chatRoomName) => {
   return (dispatch) => {
     socket.emit('newChatRoom', chatRoomName);
   }
}

export const loginToChatServerAction = (res) => ({
	type: CHAT_SERVER_LOGIN,
	payload: res
})

export const loadCurrentChatRoomList = (socket) => {
	return (dispatch) => {
		socket.on('chatRoomList',(res)=>{
       let { currentChatRoomListAction } = this.props
		   dispatch(currentChatRoomListAction(res));
	   })
	}
}

export const loginToChatServer = (socket, name) => {
   return (dispatch) => {
     socket.emit('newUser', {name});
   }
}

export const logOffFromChatServer = (socket) => {
   return (dispatch) => {
     socket.emit('disconnect');
   }
}

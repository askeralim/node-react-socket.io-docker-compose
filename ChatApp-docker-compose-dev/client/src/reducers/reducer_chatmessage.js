import {NEW_USER, NEW_CHAT_ROOM, USER_LIST, NEW_MESSAGE, CHAT_PERSON_TYPE_USER} from '../actions/index.js'
import {Map, List, fromJS} from 'immutable';
export default function(chatMessageMap = Map(), action){
  switch(action.type){
    case NEW_USER:
      //  console.log('MSG_REDUCER : NEW_USER', action.payload, "Message Map ",chatMessageMap);
        chatMessageMap = chatMessageMap.set(action.payload.id, List());
      //  console.log('MSG_REDUCER : NEW_USER', action.payload, "Message Map ",chatMessageMap);
        return chatMessageMap//push(...action.payload);/
    case NEW_CHAT_ROOM:
      //  console.log('MSG_REDUCER : NEW_USER', action.payload, "Message Map ",chatMessageMap);
        chatMessageMap = chatMessageMap.set(action.payload.id, List());
      //  console.log('MSG_REDUCER : NEW_USER', action.payload, "Message Map ",chatMessageMap);
        return chatMessageMap//push(...action.payload);/
    case USER_LIST:
      //  console.log('MSG_REDUCER : USER_LIST', action.payload, "Message Map ",chatMessageMap);
        for(let user of action.payload){
          chatMessageMap = chatMessageMap.set(user.id, List());
        //  console.log('MSG_REDUCER : USER_LIST : USER ', user, "Message Map ",chatMessageMap);
        }
      //  console.log('MSG_REDUCER : USER_LIST', action.payload, "Message Map ",chatMessageMap);
        return chatMessageMap;
    case NEW_MESSAGE:
        console.log('MSG_REDUCER : NEW_MESSAGE Message Map ',chatMessageMap);
        //Receiver Side Update the List
        //let chatList = chatMessageMap.get(action.payload.fromId);
        //chatList = chatList.push(action.payload);
        if(action.payload.recepientType == CHAT_PERSON_TYPE_USER){
          chatMessageMap = chatMessageMap.updateIn([action.payload.fromId], chatList=>chatList.push(fromJS(action.payload)));
        }
        //Sender Side Update the List
        //chatList = chatMessageMap.get(action.payload.toId);
        //chatList = chatList.push(action.payload);
        //chatMessageMap = chatMessageMap.set(action.payload.toId, chatList);
        chatMessageMap = chatMessageMap.updateIn([action.payload.toId], chatList=>chatList.push(fromJS(action.payload)));
      //  console.log('MSG_REDUCER : NEW_MESSAGE Message Map ',chatMessageMap);
        return chatMessageMap;
  }
  return chatMessageMap;
}

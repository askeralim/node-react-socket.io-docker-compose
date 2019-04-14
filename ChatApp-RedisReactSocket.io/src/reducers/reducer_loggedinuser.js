import {SEARCH_CHATROOM, CURRENT_CHAT_ROOM_LIST, USER_LIST, LOGGED_IN_USER} from '../actions/index.js'
import {Map, fromJS} from 'immutable';
export default function(loggedInUser = Map(), action){
  switch(action.type){
    case LOGGED_IN_USER:
      //console.log("Logged In User ::::", fromJS(action.payload))
        return fromJS(action.payload)
  }
  return loggedInUser;
}

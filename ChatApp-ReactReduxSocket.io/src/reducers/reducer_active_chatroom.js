import {CHAT_ROOM_SELECTED} from '../actions/index.js'
import {Map, fromJS} from 'immutable';
export default function(activeChatRoom = Map(), action){
  switch(action.type){
    case CHAT_ROOM_SELECTED:
      return fromJS(action.payload);
  }
  return activeChatRoom;
}

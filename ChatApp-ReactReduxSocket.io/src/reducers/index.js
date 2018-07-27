import { combineReducers } from 'redux';
import ChatRoomReducer from './reducer_chatroom';
import ActiveChatRoomReducer from './reducer_active_chatroom';
import LoggedInUser from './reducer_loggedinuser';
import MessageReducer from './reducer_chatmessage'

const rootReducer = combineReducers({
  chatRoomList:ChatRoomReducer,
  messageMap:MessageReducer,
  activeChatRoom:ActiveChatRoomReducer,
  loggedInUser:LoggedInUser
});

export default rootReducer;

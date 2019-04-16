import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectChatRoom } from '../actions/index';
import { bindActionCreators } from 'redux';
import ReceivedMessage from '../components/received-message.js';
import SendMessage from '../components/send-message.js';

class MessageList extends Component{
  renderList(){
      let messageList = this.props.messageMap.get(this.props.activeChatRoom.get('id'));
      if(!messageList)
        return <div/>
      return messageList.map(message => {
        if(message.get('fromId') == this.props.loggedInUser.get('id'))
          return (
              <SendMessage message={message} key={"msg"+message.get('id')}/>
          )
        else
          return (
            <ReceivedMessage message={message} key={"msg"+message.get('id')}/>
          )
      });
  }

  render(){
    if(!this.props.activeChatRoom){
        return(
          <div className="row message" id="conversation">
          </div>
        );
      }else{
        return (
          <div className="row message" id="conversation">
            {this.renderList()}
          </div>);
      }
  }
}

function mapStateToProps({chatRoomList, messageMap, activeChatRoom, loggedInUser}){// picking weather as state.weather
  return {chatRoomList, messageMap, activeChatRoom, loggedInUser}//  {weather} is same as {weather:weather}
}

export default connect(mapStateToProps)(MessageList);

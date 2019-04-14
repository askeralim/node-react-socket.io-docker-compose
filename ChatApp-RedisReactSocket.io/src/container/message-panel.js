import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectChatRoom } from '../actions/index';
import { bindActionCreators } from 'redux';

import MessageList from '../components/message-list.js'
import MessagePanelTitle from '../components/message-panel-title.js'
import MessageConsole from '../container/message-console.js'

class MessagePanel extends Component{
  render(){
  //  console.log('MESSAGE_PANEL: Message Map:', this.props.messageMap);
    return(
      <div className="col-sm-8 conversation">
        <MessagePanelTitle activeChatRoom={this.props.activeChatRoom}/>
        <MessageList />
        <MessageConsole activeChatRoom={this.props.activeChatRoom} loggedInUser={this.props.loggedInUser}/>
      </div>
    )
  }
}

function mapStateToProps({chatRoomList, messageMap, activeChatRoom, loggedInUser}){// picking weather as state.weather
  return {chatRoomList, messageMap, activeChatRoom, loggedInUser}//  {weather} is same as {weather:weather}
}

export default connect(mapStateToProps)(MessagePanel);

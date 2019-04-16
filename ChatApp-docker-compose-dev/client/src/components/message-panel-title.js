import React, { Component } from 'react';
import {CHAT_PERSON_TYPE_USER, CHAT_PERSON_TYPE_CHAT_ROOM } from '../actions/index'
export default class ChatRoomPanelTitle extends Component {
  renderTitle(){
    if(this.props.activeChatRoom){
      return (<a className="heading-name-meta">{this.props.activeChatRoom.get('name') }   </a>)
    }else{
      return (<a className="heading-name-meta"> </a>)
    }
  }
  renderImage(chatRoom){
    if(this.props.activeChatRoom.get('type') == CHAT_PERSON_TYPE_USER)
      return(
        <div className="heading-avatar-icon">
          <img src="/img/man.ico" />
        </div>
      )
    else if(this.props.activeChatRoom.get('type') == CHAT_PERSON_TYPE_CHAT_ROOM)
      return(
        <div className="heading-avatar-icon">
          <img src="/img/group.png" />
        </div>
      )
  }
  render() {
    return (
      <div className="row heading">
        <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
          {this.renderImage()}
        </div>
        <div className="col-sm-8 col-xs-7 heading-name">
            {this.renderTitle()}
          <span className="heading-online">Online</span>
        </div>
        <div className="col-sm-1 col-xs-1  heading-dot pull-right">
          <i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

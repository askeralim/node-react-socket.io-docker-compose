import React, {Component} from 'react';
import { connect } from 'react-redux';
import { CHAT_PERSON_TYPE_CHAT_ROOM,
        CHAT_PERSON_TYPE_USER,
        selectChatRoomDispatcher,
        loadCurrentChatRoomList,
        loginToChatServer,
        usersListAction,
        loginUserAction,
        newUserAction,
        newChatRoomAction,
        newMessageAction} from '../actions/index';
import { bindActionCreators } from 'redux';
import Dialog from 'react-bootstrap-dialog'
import socket from "../components/socket.js"

class ChatRoomList extends Component{
  constructor(props){
    super(props);

    //console.log(socket);
    //console.log("PROPS::",props, this)
    const {dispatch} = props;
    //dispatch(loadCurrentChatRoomList(socket));
    this.handleChatRoomOnClick = this.handleChatRoomOnClick.bind(this);
    this.openModal = this.openModal.bind(this)

    socket.on('userList',(res)=>{
		   //console.log("SOCKET :::: User List Received :", res)
		   dispatch(usersListAction(res));
	   })

     socket.on('myDetails',(res)=>{
		   //console.log('SOCKET :::: My Login Details Message',res)
		   dispatch(loginUserAction(res));
	   })
	   socket.on('user',(res)=>{
		  // console.log('SOCKET :::: User Added Message',res)
		   dispatch(newUserAction(res));
	   })
     socket.on('chatroom',(res)=>{
		   //console.log('SOCKET :::: ChatRoom Added Message',res)
		   dispatch(newChatRoomAction(res));
	   })
     socket.on('message',(res)=>{
		  // console.log('SOCKET :::: Message Received Message',res)
		   dispatch(newMessageAction(res));
	   })


  }
  componentDidMount(){
    //console.log('Component Mounted : Looking for Nick Name');
    this.openModal();
  }
  openModal() {
    this.setState({modalIsOpen: true});
    this.dialog.show({
      body: 'Nick Name Please..',
      prompt: Dialog.TextPrompt({initialValue: 'Nick',placeholder: 'Nick Name'}),
      actions: [
        Dialog.OKAction((dialog) => {
          const result = dialog.value
          if(result && result.length >0){
            this.setState({modalIsOpen: false, isLoggedIn:true});
          }
          this.props.dispatch(loginToChatServer(socket, result));
        })
      ],
      onHide: (dialog) => {  }
    })
  }

  handleChatRoomOnClick(){
    let { dispatch,chatRoom } = this.props
    dispatch(selectChatRoomDispatcher(chatRoom));
  }
  renderImage(chatRoom){
    if(chatRoom.get('type') == CHAT_PERSON_TYPE_USER)
      return(
        <div className="avatar-icon">
          <img src="img/man.ico" />
        </div>
      )
    else
      return(
        <div className="avatar-icon">
          <img src="img/group.png" />
        </div>
      )
  }
  renderChatName(chatRoom){
    //console.log('renderChatName :'+JSON.stringify(chatRoom));
    if(chatRoom.get('newMessage'))
      return(
        <span className="name-meta"><strong>{chatRoom.get('name')}</strong></span>
      )
    else
      return(
        <span className="name-meta">{chatRoom.get('name')}</span>
      )
  }
  renderList(){
    if(!this.props.chatRoomList)
    return <div/>
    let chatRoomList = this.props.chatRoomList.filter(room =>  room.get('id') != this.props.loggedInUser.get('id') && room.get('show') == true);
    return chatRoomList.map((chatRoom)=>{
        return (
          <div className="row sideBar-body"  key={chatRoom.get('id')} onClick={()=> this.props.dispatch(selectChatRoomDispatcher(chatRoom))}>
            <div className="col-sm-3 col-xs-3 sideBar-avatar">
              {this.renderImage(chatRoom)}
            </div>
            <div className="col-sm-9 col-xs-9 sideBar-main">
              <div className="row">
                <div className="col-sm-8 col-xs-8 sideBar-name">
                    {this.renderChatName(chatRoom)}
                </div>
                <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                  <span className="time-meta pull-right">{chatRoom.get('time')}
                </span>
                </div>
              </div>
            </div>
          </div>
          )
        });
  }
  render(){
    return(
      <div className="row sideBar">
        <Dialog ref={(el) => { this.dialog = el }} />
        { this.renderList() }
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    chatRoomOnClick: (chatRoom) => dispatch(selectChatRoomDispatcher(chatRoom))
  }
}

function mapStateToProps({chatRoomList, loggedInUser}){// picking weather as state.weather
  return {chatRoomList, loggedInUser}//  {weather} is same as {weather:weather}
}
/*function mapDispatchToProps(dispatch){
  return bindActionCreators({selectChatRoom : selectChatRoom}, dispatch);
}*/

export default connect(mapStateToProps)(ChatRoomList);

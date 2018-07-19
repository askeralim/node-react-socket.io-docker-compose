import React, {Component} from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component{
  render(){
    if(!this.props.activeBook)
      return (
        <div>  Please Select One Book </div>
      );
    return (
      <div>   {this.props.activeBook.title} </div>
    );

  }
}

function mapStateToProps(state){
  return {
      activeBook : state.activeBook
  }
}

export default connect(mapStateToProps)(BookDetail);

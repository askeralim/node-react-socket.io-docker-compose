import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component{
  renderList(){
    return(
      this.props.bookList.map((book)=> {
        return (
          <li
            onClick={()=>this.props.selectBook(book)}
            className='list-group-item'
            key={book.title} >
            {book.title}
          </li>
        )
      })
    )
  }
  render(){
    return(
      <ul className='list-group col-sm-4'>
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state){
  return {
      bookList : state.bookList
  }
}
function mapDispatchToProps(dispath){
  return bindActionCreators({selectBook : selectBook}, dispath);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);

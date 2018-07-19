import React, { Component } from 'react';
import BookList from '../container/book-list';
import BookDetail from '../container/book-detail';

export default class App extends Component {
  render() {
    return (
      <div>
          <BookList />
          <BookDetail />
      </div>
    );
  }
}

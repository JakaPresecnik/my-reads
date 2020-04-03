import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import LibraryBooks from './bookLibrary/LibraryBooks'

class BookLibrary extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({
        books
      })
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={(e) => this.props.showMyBooksPage()}>Close</button>
          <div className="search-books-input-wrapper">
            {console.log(this.state)/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <LibraryBooks books={this.state.books}/>
        </div>
      </div>
    )
  }
}

export default BookLibrary

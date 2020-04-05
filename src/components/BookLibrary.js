import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import LibraryBooks from './bookLibrary/LibraryBooks'
import NoBooksFound from './bookLibrary/NoBooksFound'
import { Link } from 'react-router-dom'

class BookLibrary extends Component {
  state = {
    books: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({
        books
      })
    })
  }

// componentDidMount used here to have the API do the search
  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query && this.state.query !== '') {
      BooksAPI.search(this.state.query)
      .then((books) => {
        this.setState({
          books: books
        })
      })
    }
  }


  render() {
    const { books, searchBooks, query } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e)=> this.setState({query: e.target.value.split(/\s+/).join(' ')})}
            />

          </div>
        </div>
        <div className="search-books-results">
        {Array.isArray(books) ? (
          <LibraryBooks books={books}/>
        ) : (
          <NoBooksFound />
        )}

        </div>
      </div>
    )
  }
}

export default BookLibrary

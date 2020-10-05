import React, { Component } from 'react'
import LibraryBooks from './bookLibrary/LibraryBooks'
import NoBooksFound from './bookLibrary/NoBooksFound'
import { Link } from 'react-router-dom'

class BookLibrary extends Component {
  render() {
    const { books, query, updateQuery } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/my-reads/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e)=> updateQuery(e)}
            />

          </div>
        </div>
        <div className="search-books-results">
        {Array.isArray(books) ? (
          <LibraryBooks
            books={books}
            updateShelfs={this.props.updateShelfs}
          />
        ) : (
          <NoBooksFound />
        )}

        </div>
      </div>
    )
  }
}

export default BookLibrary

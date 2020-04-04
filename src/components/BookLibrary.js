import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import LibraryBooks from './bookLibrary/LibraryBooks'
import NoBooksFound from './bookLibrary/NoBooksFound'

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
          <button className="close-search" onClick={(e) => this.props.showMyBooksPage()}>Close</button>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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

import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelfs from './components/BookShelfs'
import BookLibrary from './components/BookLibrary'

class BooksApp extends React.Component {
  state = {
    book: {},
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  onShowSearchPage = (e) => {
    this.setState({showSearchPage: !this.state.showSearchPage})
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookLibrary showMyBooksPage={this.onShowSearchPage}/>
        ) : (
          <BookShelfs showSearchPage={this.onShowSearchPage} />
        )}
      </div>
    )
  }
}

export default BooksApp

import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelfs from './components/BookShelfs'
import BookLibrary from './components/BookLibrary'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    book: {},
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    
  }

  render() {
    return (
      <div className="app">
        <Route exact path= "/" component={BookShelfs} />
        <Route path= "/search" component={BookLibrary} />
      </div>
    )
  }
}

export default BooksApp

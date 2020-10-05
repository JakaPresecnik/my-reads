import React from 'react'
import './App.css'
import BookShelfs from './components/BookShelfs'
import BookLibrary from './components/BookLibrary'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


// I split the book array to two so the performance is faster
class BooksApp extends React.Component {
  state = {
    shelfs: [
      {id: 'currentlyReading', text: 'Currently Reading'},
      {id: 'wantToRead', text: 'Want to Read',},
      {id: 'read', text: 'Read', }
    ],
    books: [],
    allBooks: [],
    query: ''
  }

// used to get all books stored on the server to the DOM
  componentDidMount() {
    BooksAPI.getAll()
    .then((allBooks) => {
      this.setState({
        books: allBooks
      })
    })
  }

  // componentDidUpdate used here to have the API do the search in /search tab
  // also giving the proper shelf if we have it in any of our shelfs
  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      BooksAPI.search(this.state.query)
      .then((allBooks) => {
        Array.isArray(allBooks) &&
        this.state.books.map((myBook) =>{
          allBooks.map((book) => {
            if(book.id === myBook.id) {
              book.shelf = myBook.shelf
            }
          })
        })
        this.setState({
          allBooks: allBooks
        })
      })

    }
  }

  updateQuery = (e) => {
    this.setState({query: e.target.value.split(/\s+/).join(' ')})
  }

// here we update the server array and our DOM. It is split due to performance (much slower if only BooksAPI used)
  updateShelfs = (e, book) => {
    BooksAPI.update(book, e.target.value)

    const index = this.state.books.indexOf(book)

    if (e.target.value === 'none') {
      let copyBooks = Object.assign({}, this.state)
      copyBooks.books = copyBooks.books !== copyBooks.books.splice(index, 1) && copyBooks.books

      this.setState (copyBooks)
    }else {
      let copyBooks = Object.assign({}, this.state)
      copyBooks.books[index].shelf = e.target.value

      this.setState (copyBooks)
    }
  }


//this one adds the book from the search to our DOM or change the shelf if already in our array.
//it also sends the new data to server to be stored
  addToBooks = (e, book) => {
    const index = this.state.allBooks.indexOf(book)
    let copyBooks = Object.assign({}, this.state)
    copyBooks.allBooks[index].shelf = e.target.value

    if(!this.state.books.includes(book)){
      copyBooks.books.push(book)
    }else {
      const index = this.state.books.indexOf(book)
      let copyBooks = Object.assign({}, this.state)
      copyBooks.books[index].shelf = e.target.value
    }
    this.setState({copyBooks})
    BooksAPI.update(book, e.target.value)
  }

  render() {
    return (
      <div className="app">
        <Route exact path= "/my-reads/" render={() => (
            <BookShelfs
              shelfs={this.state.shelfs}
              books={this.state.books}
              updateShelfs={this.updateShelfs}
            />
          )}
        />
        <Route exact path= "/my-reads/search" render={() => (
            <BookLibrary
              updateShelfs={this.addToBooks}
              books={this.state.allBooks}
              query={this.state.query}
              updateQuery={this.updateQuery}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp

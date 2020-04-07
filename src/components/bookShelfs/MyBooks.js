import React, { Component } from 'react'
import SelectShelf from '../SelectShelf'

class MyBooks extends Component {

  render() {
    const { shelf, updateShelfs, books } = this.props

    return (
      <ol className="books-grid">
      {books
        .filter((book) => (book.shelf === shelf.id))
        .map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <SelectShelf updateShelfs={updateShelfs} shelf={shelf} book={book}/>
              </div>
              <div className="book-title"><h4>{book.title}</h4></div>
              <div className="book-authors">{book.authors.map((author) => <p key={author}>{author}</p>)}</div>
            </div>
          </li>
        )
      )}
      </ol>
    )
  }
}

export default MyBooks

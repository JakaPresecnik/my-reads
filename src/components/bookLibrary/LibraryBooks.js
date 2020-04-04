import React, { Component } from 'react'

class LibraryBooks extends Component {
  render() {

    console.log(this.props.books)

    return (
      <ol className="books-grid">
      {this.props.books
        .map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">

                {book.imageLinks != null && (
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                )}

              </div>
              <div className="search-book-title">
                <h4>{book.title}</h4>
                <h6>{book.subtitle}</h6>
              </div>

              {Array.isArray(book.authors) && book.authors != null && (
                <div className="book-authors">{book.authors.map((author) => <p key={author}>{author}</p>)}</div>
              )}

            </div>
          </li>
        )
      )}
      </ol>
    )
  }
}

export default LibraryBooks

import React from 'react'
import MyBooks from './bookShelfs/MyBooks'
import { Link } from 'react-router-dom'

const BookShelfs = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {props.shelfs.map((shelf) => (
            <div className="bookshelf" key={shelf.id}>
              <h2 className="bookshelf-title">{shelf.text}</h2>
              <div className="bookshelf-books">
                <MyBooks updateShelfs={props.updateShelfs} shelf={shelf} books={props.books}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link className="button" to="/search">Search Books</Link>
      </div>
    </div>
  )
}

export default BookShelfs

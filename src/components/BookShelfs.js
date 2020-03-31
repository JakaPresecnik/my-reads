import React, { Component } from 'react'
import MyBooks from './bookShelfs/MyBooks'

class BookShelfs extends Component {
  state = {
    shelfs: [
      {
        id: 'reading',
        text: 'Currently Reading'
      },
      {
        id: 'wantToRead',
        text: 'Want to Read'
      },
      {
        id: 'read',
        text: 'Read'
      }
    ]
  }

  checkShelfs = (shelf, books) => {
    this.shelfs.forEach((shelf) => {
      console.log('hello')
    })
  }

  render() {
    const { shelfs } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfs.map((shelf) => (
              <div className="bookshelf" key={shelf.id}>
                <h2 className="bookshelf-title">{shelf.text}</h2>
                <div className="bookshelf-books">
                  <MyBooks shelf={shelf}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
    )
  }
}

export default BookShelfs

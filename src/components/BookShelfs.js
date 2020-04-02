import React, { Component } from 'react'
import MyBooks from './bookShelfs/MyBooks'

class BookShelfs extends Component {
  state = {
    shelfs: [
      {
        id: 'reading',
        text: 'Currently Reading',
        books: ['toKillAMockingBird', 'endersGame']
      },
      {
        id: 'wantToRead',
        text: 'Want to Read',
        books: ['1776', 'HPAndTheSorcerer']
      },
      {
        id: 'alreadyRead',
        text: 'Read',
        books: ['theHobbit', 'ohThePlacesYoullGo', 'theAdventuresOfTomSawyer']
      }
    ]
  }

  removeBook = (shelf, book) => {
    const i = this.state.shelfs.indexOf(shelf)

    this.state.shelfs[i].books.map((bookOnShelf, index) => {
      if (bookOnShelf === book.id ) {

        this.setState((currentState) => ({
          shelfs: currentState.shelfs[i].books !== this.state.shelfs[i].books.splice(index, 1) && currentState.shelfs
        }))
      }
      console.log(i)
    })
  }

  updateShelfs = (e, shelf, book) => {
    this.removeBook(shelf, book)

    this.state.shelfs.map((shelf, index) => {
      if (shelf.id === e.target.value) {

        this.setState((previousState) => {
          shelfs: previousState.shelfs[index].books.push(book.id)
        })
        console.log(this.state)
      }
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.state.shelfs.map((shelf) => (
              <div className="bookshelf" key={shelf.id}>
                <h2 className="bookshelf-title">{shelf.text}</h2>
                <div className="bookshelf-books">
                  <MyBooks updateShelfs={this.updateShelfs} shelf={shelf} />
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

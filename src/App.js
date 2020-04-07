import React from 'react'
import './App.css'
import BookShelfs from './components/BookShelfs'
import BookLibrary from './components/BookLibrary'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    shelfs: [
      {id: 'reading', text: 'Currently Reading'},
      {id: 'wantToRead', text: 'Want to Read',},
      {id: 'alreadyRead', text: 'Read', }
    ],
    myBooks: [
      {id: 'toKillAMockingBird', title: 'To Kill a Mockingbird', authors: ['Harper Lee'], shelf: 'reading', imageURL: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',},
      {id: 'endersGame', title: 'Ender\'s Game', authors: ['Orson Scott Card'], shelf: 'reading', imageURL: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',},
      {id: '1776', title: '1776', authors: ['David McCullough'], shelf: 'wantToRead', imageURL: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',},
      {id: 'HPAndTheSorcerer', title: 'Harry Potter and the Sorcerer\'s Stone', authors: ['J.K. Rowling'], shelf: 'wantToRead', imageURL: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api',},
      {id: 'theHobbit', title: 'The Hobbit', authors: ['J.R.R. Tolkien'], shelf: 'alreadyRead', imageURL: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',},
      {id: 'ohThePlacesYoullGo', title: 'Oh, the Places You\'ll Go', authors: ['Seuss'], shelf: 'alreadyRead', imageURL: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api',},
      {id: 'theAdventuresOfTomSawyer', title: 'The Adventures of Tom Sawyer', authors: ['Mark Twain'], shelf:'alreadyRead', imageURL: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api',},
    ],
    books: [],
    query: ''
  }

  // componentDidUpdate used here to have the API do the search
  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      BooksAPI.search(this.state.query)
      .then((books) => {
        Array.isArray(books) &&
        this.state.myBooks.map((myBook) =>{
          books.map((book) => {
            if(book.id === myBook.id) {
              book.shelf = myBook.shelf
            }
          })
        })
        this.setState({
          books: books
        })
      })
    }
  }

  updateQuery = (e) => {
    this.setState({query: e.target.value.split(/\s+/).join(' ')})
  }

  updateShelfs = (e, book) => {
    const index = this.state.myBooks.indexOf(book)

    if (e.target.value === 'none') {
      let copyBooks = Object.assign({}, this.state)
      copyBooks.myBooks = copyBooks.MyBooks !== copyBooks.myBooks.splice(index, 1) && copyBooks.myBooks
      
      this.setState (copyBooks)
    }else {
      let copyBooks = Object.assign({}, this.state)
      copyBooks.myBooks[index].shelf = e.target.value

      this.setState (copyBooks)
    }
  }

  addToMyBooks = (e, book) => {
    const index = this.state.books.indexOf(book)
    let copyBooks = Object.assign({}, this.state)
    copyBooks.books[index].shelf = e.target.value
    copyBooks.books[index].imageURL = book.imageLinks.thumbnail

    this.state.myBooks.includes(book)
    ? this.updateShelfs(e, book)
    : copyBooks.myBooks.push(book)

    this.setState(copyBooks)
  }

  render() {
    return (
      <div className="app">
        <Route exact path= "/" render={() => (
            <BookShelfs
              shelfs={this.state.shelfs}
              books={this.state.myBooks}
              updateShelfs={this.updateShelfs}
            />
          )}
        />
        <Route exact path= "/search" render={() => (
            <BookLibrary
              updateShelfs={this.addToMyBooks}
              books={this.state.books}
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

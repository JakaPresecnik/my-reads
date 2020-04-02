import React, { Component } from 'react'

class SelectShelf extends Component {

  render () {
    return (
      <div className="book-shelf-changer">
        <select onChange={(e) => (this.props.updateShelfs(e, this.props.shelf, this.props.book))}>
          <option value="move" disabled>Move to...</option>
          <option value="reading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="alreadyRead">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default SelectShelf

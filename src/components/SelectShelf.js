import React from 'react'

const SelectShelf = (props) => {
    return (
      <div className="book-shelf-changer">
        <select value={props.book.shelf || "none"} onChange={(e) => (props.updateShelfs(e, props.book))}>
          <optgroup label="Move to...">
            <option value="reading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="alreadyRead">Read</option>
            <option value="none">None</option>
          </optgroup>
        </select>
      </div>
    )
}

export default SelectShelf

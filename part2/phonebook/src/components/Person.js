import React from 'react'

const Person = (props) => {
  const name = props.person.name
  const number = props.person.number
  const handleClick = props.handleClick

  return (
    <li>
      {name} {number}
      <button onClick={handleClick}>delete</button>  
    </li>
  )
}
  
export default Person
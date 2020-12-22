import React from 'react'

const Person = (props) => {
    return (
      <li>{props.person.name} {props.person.number}</li>
    )
  }
  
const Persons = (props) => {
    const filteredPersons = props.persons.filter(person => 
      person.name.toUpperCase().includes(props.filter.toUpperCase()))
  
    return (
      <ul>
        {filteredPersons.map((person) =>
          <Person key={person.name} person={person}/>
        )}
      </ul>
    )
}

export default Persons
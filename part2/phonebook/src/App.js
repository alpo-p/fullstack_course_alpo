import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Filter from './components/Filter'
import Notification from './components/Notification'
import peopleService from './services/people'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notificationMsg, setNotificationMsg] = useState(null)
  const [ error, setError] = useState(false)
  
  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const changeNumber = () => {
      const personId = persons.find(n => n.name === personObject.name).id
      window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)
        && peopleService.update(personId, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(n => n.name !== personObject.name ? n : returnedPerson))
            setError(false)
            setNotificationMsg(`Changed number for ${personObject.name}`)
            setTimeout(() => setNotificationMsg(null), 2000)
          })
    }

    persons
      .map(person => person.name)  
        .includes(personObject.name) 
          ? changeNumber()
          : peopleService
              .create(personObject)
              .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')}) 
                setError(false)
                setNotificationMsg(`Added ${personObject.name}`)
                setTimeout(() => setNotificationMsg(null), 2000)
  }

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilterChange = event => setFilter(event.target.value)

  const handleDelete = person => {
    window.confirm(`Delete ${person.name} ?`) 
      && peopleService.del(person.id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== person.id))
          setError(false)
          setNotificationMsg(`Deleted ${person.name}`)
          setTimeout(() => setNotificationMsg(null), 2000)})
        .catch(error => {
          setError(true)
          setNotificationMsg(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => setNotificationMsg(null), 2000)
          setPersons(persons.filter(n => n.id !== person.id))
        })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMsg} error={error}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      
      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <ul>
        {persons
          .filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
          .map((person) => 
            <Person key={person.name} person={person} handleClick={() => handleDelete(person)}/>)}
      </ul>
    </div>
  )
}

export default App
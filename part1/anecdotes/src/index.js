import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0])
  
  const randInt = (min,max) => Math.floor(Math.random()*(max-min+1)+min)

  const handleNext = () => setSelected(randInt(0,5))

  const handlePoints = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    mostPoints()
  }

  const mostPoints = () => {
    const index = points.indexOf(Math.max(...points))
    return index
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>has {points[selected]} votes</div>
      <div>
        <Button handleClick={handlePoints} text="vote" />
        <Button handleClick={handleNext} text="next anecdote" />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        {props.anecdotes[mostPoints()]}
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = ({text, value}) => <div>{text} {value}</div>

const Statistics = (props) => {
  const good = props.good
  const bad = props.bad
  const neutral = props.neutral

  const all = (good+bad+neutral)

  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const avg = (good-bad)/all
  const positive = (good/all*100) + " %"

  return (
    <div>
      <table>
        <tbody>
          <tr><td><Statistic text="good" value={good} /></td></tr>
          <tr><td><Statistic text="neutral" value={neutral} /></td></tr>
          <tr><td><Statistic text="bad" value={bad} /></td></tr>
          <tr><td><Statistic text="all" value={all} /></td></tr>
          <tr><td><Statistic text="average" value={avg} /></td></tr>
          <tr><td><Statistic text="positive" value={positive} /></td></tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks to their own states
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleBad = () => setBad(bad+1)
  const handleNeutral = () => setNeutral(neutral+1)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={()=>{handleGood()}} text="good" />
        <Button handleClick={()=>{handleNeutral()}} text="neutral" />
        <Button handleClick={()=>{handleBad()}} text="bad" />      
      </div>
        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App/>,
  document.getElementById('root')  
)
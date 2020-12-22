import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './index.css'
import Filter from './components/Filter'


const api_key = process.env.REACT_APP_API_KEY 


const CoupleOfCountries = ({ data }) => {
  return (
    <ul className='no-margin'>
      {data.map(country =>
        <OneCountry key={country.name} data={country}  />
      )}
    </ul>
  )
}


const Info = ({ data }) => {
  const name = data.name
  const capital = data.capital
  const population = data.population
  const languageArray = data.languages
  const flagUrl = data.flag

  const [ weatherData, setWeatherData ] = useState([])
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+capital+"&appid="+api_key+"&units=metric"
  useEffect(() => {
    axios
      .get(weatherUrl)
      .then(wResponse => {
        setWeatherData(wResponse.data)
      })
  },[])
  
  const temp = weatherData?.main?.temp || '0'

  return (
    <div>
      <h1>{name}</h1>
      <ul className='no-margin'>
        <li>Capital: {capital}</li>
        <li>Population: {population}</li>
      </ul>
      <h2>Languages</h2>
      <ul>
        {languageArray.map(lang =>
          <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={flagUrl} alt='Country flag'/>
      <div>
          <h2>Weather in {capital}</h2>
          <p>temperature: {temp} C</p>
      </div> 
    </div>
  )
}

const Nimi = ({ name }) => (
  <div>
    <li>
      {name}
    </li>
  </div>
)


const OneCountry = ({ data }) => {
  const [showInfo, setShowInfo] = React.useState(false)
  const onClick = () => setShowInfo(!showInfo)
  
  return (
    <div>
        { showInfo ? <Info data={data}/> : <Nimi name={data.name} />}
        <button onClick={onClick}> show </button>
    </div>
  )
}
  


const ShowOne = ({ data }) => {
  const name = data.map(country => country.name)
  const capital = data.map(country => country.capital)
  const population = data.map(country => country.population)
  const languageArray = data.map(country => country.languages)
  const flagUrl = data.map(country => country.flag)

  const [ weatherData, setWeatherData ] = useState([])
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+capital+"&appid="+api_key+"&units=metric"
  useEffect(() => {
    axios
      .get(weatherUrl)
      .then(wResponse => {
        setWeatherData(wResponse.data)
      })
  },[])
  
  const temp = weatherData?.main?.temp || '0'

  return (
    <div>
      <h1>{name}</h1>
      <ul className='no-margin'>
        <li>Capital: {capital}</li>
        <li>Population: {population}</li>
      </ul>
      <h2>Languages</h2>
      <ul>
        {languageArray[0].map(lang =>
          <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={flagUrl} alt='Country flag'/> 
      <div>
          <h2>Weather in {capital}</h2>
          <p>temperature: {temp} C</p>
      </div> 
    </div>
  )
}

const Countries = ({ data, filter }) => {
  const filteredCountries = data.filter(country =>
    country.name.toUpperCase().includes(filter.toUpperCase()))
    
  const len = filteredCountries.length
  
  if (len>10) {
    return <div>Too many matches, specify another filter</div>
  } else if (len>1) {
    return <CoupleOfCountries data={filteredCountries} />
  } else if (len===1) {
    return <ShowOne data={filteredCountries} />
  } else {
    return <div>Empty</div>
  }
}

const App = () => {
  const [ data, setData ] = useState([])
  const [ filter, setFilter ] = useState('')
  
  const url = 'https://restcountries.eu/rest/v2/all'
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setData(response.data)
      })
  },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries data={data} filter={filter} />
    </div>
  )

}

export default App

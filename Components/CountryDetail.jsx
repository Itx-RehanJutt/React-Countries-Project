import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import './countryDetail.css'
import { useTheme } from '../Hooks/useTheme'
import CountryDetailShimmer from './CountryDetailShimmer'

export default function CountryDetail() {

  const params = useParams()
  const countryName = params.country
  const [countrydata, setCountryData] = useState(null)
  const [NotFound, setNotFound] = useState(false)

  const [isDark] = useTheme()

  const { state } = useLocation()

  function UpdateCountryData(data) {
    setCountryData({
      image: data.flags.svg,
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName || {})[0].common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      tld: data.tld,
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(', '),
      languages: Object.values(data.languages || {}).join(', '),
      borders: []
    })
    if (!data.borders) {
      data.borders = []
    }
    Promise.all(data.borders.map((border) => {
      return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then(([borderCountry]) => borderCountry.name.common)
    })).then((borders) => {
      setCountryData((prevState) => ({ ...prevState, borders }))
    })
  }

  useEffect(() => {

    if (state) {
      UpdateCountryData(state)
      return
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        UpdateCountryData(data)
      }).catch((err) => {
        setNotFound(true)
      })
  }, [countryName])
  if (NotFound) {
    return (<h1>Country Not Found</h1>)
  }
  return (
    <main className={`${isDark ? 'dark' : ''}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {countrydata === null ? (<CountryDetailShimmer />) :
          (<div className="country-details">
            <img src={countrydata.image} alt={`${countrydata.name} flag`} />
            <div className="details-text-container">
              <h1>{countrydata.name}</h1>
              <div className="details-text">
                <p><b>Native Name: {countrydata.nativeName || countrydata.name}</b><span className="native-name"></span></p>
                <p><b>Population: {countrydata.population.toLocaleString(
                  'en-IN'
                )} </b><span className="population"></span></p>
                <p><b>Region: {countrydata.region}</b><span className="region"></span></p>
                <p><b>Sub Region: {countrydata.subregion}</b><span className="sub-region"></span></p>
                <p><b>Capital: {countrydata.capital?.join(', ')} </b><span className="capital"></span></p>
                <p>
                  <b>Top Level Domain: {countrydata.tld}</b><span className="top-level-domain"></span>
                </p>
                <p><b>Currencies: {countrydata.currencies}</b><span className="currencies"></span></p>
                <p><b>Languages: {countrydata.languages}</b><span className="languages"></span></p>
              </div>
              {countrydata.borders.length !== 0 && <div className="border-countries"><b>Border Countries: </b>&nbsp;
                {
                  countrydata.borders.map((border) => <Link key={border} to={`/${border}`}>{border}</Link>)
                }</div>}
            </div>
          </div>)}
      </div>
    </main>
  )
}

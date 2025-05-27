import { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import CountryListShimmer from "./CountryListShimmer"

export default function CountiriesList({ query }) {

  const [CountiriesData, setCountiriesData] = useState([])
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountiriesData(data)
      })
  }, [])

  // if (!CountiriesData.length) {
  //   return <CountryListShimmer />
  // }
  
  return (
    <>
      {!CountiriesData.length ? (<CountryListShimmer />) : (<div className="countries-container">
        {
          CountiriesData.filter((country) => country.name.common.toLowerCase().includes(query) || 
          country.region.toLowerCase().includes(query)).map((country) => {
            return <CountryCard
              key={country.name.common}
              name={country.name.common}
              Image={country.flags.svg}
              population={country.population}
              region={country.region}
              capital={country.capital?.[0]}
              data = {country}
            />
          })
        }
      </div>)}
    </>
  )
}

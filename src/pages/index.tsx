import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [state, setState] = useState([])
  const [uf, setUf] = useState('')
  const [cities, setCities] = useState([])
  const [city, setCity] = useState('')

  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`).then(res => {
      const response = res.data
      setState(response)
    })
  }, [])

  useEffect(() => {
    if (uf !== '') {
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(res => {
        const response = res.data
        setCities(response)
      })
    }
  }, [state, uf])

  return (
    <div>
      <input
        list="states"
        name="state"
        id="state"
        className="border-2 border-black"
        onChange={event => setUf(event.target.value)}
      />
      <datalist id="states">
        {state.map(uf => {
          return <option value={uf.sigla} key={uf.id} />
        })}
      </datalist>
      <input
        list="cities"
        name="city"
        id="city"
        className="border-2 border-black"
        onChange={event => setCity(event.target.value)}
      />
      <datalist id="cities">
        {cities.map(city => {
          return <option value={city.nome} key={city.id} />
        })}
      </datalist>
      {console.log(uf, city)}
    </div>
  )
}

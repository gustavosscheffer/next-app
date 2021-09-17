import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [state, setState] = useState([])

  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`).then(res => {
      const response = res.data
      setState(response)
      console.log(response)
    })
  }, [])

  return (
    <div>
      <input list="states" name="state" id="state" />
      <datalist id="states">
        {state.map(uf => {
          return <option value={uf.nome} key={uf.id} />
        })}
      </datalist>
    </div>
  )
}

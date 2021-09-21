import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'

type HomeProps = {
  ufs: Uf[]
}

type Uf = {
  nome: string
  id: number
  sigla: string
}

export default function Home({ ufs }: HomeProps) {
  const [uf, setUf] = useState('')
  const [cities, setCities] = useState([])
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      const cities = await res.json()
      setCities(cities)
    }
    if (uf !== '') {
      setLoading(true)
      fetchData()
      setLoading(false)
    }
  }, [uf])

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
        {ufs.map(uf => {
          return <option value={uf.sigla} key={uf.id} />
        })}
      </datalist>
      <input
        list="cities"
        name="city"
        id="city"
        className="border-2 border-black"
        onChange={event => setCity(event.target.value)}
        disabled={loading}
      />
      <datalist id="cities">
        {cities.map(city => {
          return <option value={city.nome} key={city.id} />
        })}
      </datalist>
      {console.log(city)}
    </div>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  const ufs: Uf[] = await res.json()

  if (!ufs) {
    return {
      notFound: true,
    }
  }

  return {
    props: { ufs },
    revalidate: 10,
  }
}

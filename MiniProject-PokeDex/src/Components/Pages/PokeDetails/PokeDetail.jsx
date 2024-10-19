import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { determineRegion } from '../PokeDex/DexComponents'


export const PokeDetail = () => {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [evolutions, setEvolutions] = useState([])
  const [forms, setForms] = useState([])

  const fetchVarietySprites = async (varieties) => {
    const varietiesWithSprites = await Promise.all(varieties.map(async (variety) => {
      const res = await axios.get(variety.pokemon.url)
      return {
        name: variety.pokemon.name,
        sprite: res.data.sprites.other['official-artwork'].front_default,
        id: res.data.id
      }
    }))
    return varietiesWithSprites
  }
  
  
  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const nationalDexNumber = res.data.id
        const region = determineRegion(nationalDexNumber)
  
        const speciesRes = await axios.get(res.data.species.url)
        const evolutionChainUrl = speciesRes.data.evolution_chain.url
  
        const evolutionChainRes = await axios.get(evolutionChainUrl)
        const evolutionsData = await extractEvolutions(evolutionChainRes.data.chain)
  
        const varietyData = await fetchVarietySprites(speciesRes.data.varieties) 
  
        setPokemon({ ...res.data, region })
        setEvolutions(evolutionsData)
        setForms(varietyData) 
      } catch {
        setError('Failed to fetch Pokémon details')
      } finally {
        setLoading(false)
      }
    }
  
    fetchPokemonDetail()
  }, [id])
  

  
  const extractEvolutions = async (chain) => {
    const evolutionsList = []

    const traverseChain = async (evolution) => {
      const speciesName = evolution.species.name
      const pokeRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${speciesName}`)
      evolutionsList.push({
        name: speciesName,
        sprite: pokeRes.data.sprites.other['official-artwork'].front_default,
        id: pokeRes.data.id 
      })
      if (evolution.evolves_to.length > 0) {
        await Promise.all(evolution.evolves_to.map(traverseChain))
      }
    }

    await traverseChain(chain)
    return evolutionsList
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!pokemon) return null

  return (
    <div className="poke-detail">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      <p>Types: {pokemon.types.map(type => type.type.name).join(', ')}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Region: {pokemon.region}</p>

      <p><strong>Evolutions</strong></p>
      <ul>
        {evolutions.map(evolution => (
          <li key={evolution.id}>
            <Link to={`/pokemon/${evolution.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img 
                src={evolution.sprite} 
                alt={evolution.name} 
                style={{ width: '50px', height: '50px' }} 
              />
              <span>{evolution.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p><strong>Varieties</strong></p>
<ul>
  {forms.map((form) => (
    <li key={form.id}>
      <Link to={`/pokemon/${form.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img 
          src={form.sprite} 
          alt={form.name} 
          style={{ width: '50px', height: '50px' }} 
        />
        <span>{form.name}</span>
      </Link>
    </li>
  ))}
</ul>


      <p><strong>Stats</strong></p>
      <ul>
        {pokemon.stats.map(stat => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  )
}

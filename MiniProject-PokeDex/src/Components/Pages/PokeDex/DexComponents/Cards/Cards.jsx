import PropTypes from 'prop-types'
import './Cards.css'
import { Link } from 'react-router-dom'
export const Cards = ({
    pokemon = []
}) => {
  const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#D685AD',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#F95587',
  }
  
  return (
    <>
        {pokemon.map(p => {
           
            const firstType = p.type[0].toLowerCase()
            const cardColor = typeColors[firstType] || '#FFFFFF'
            const imageUrl = p.sprite ? p.sprite : 'src/assets/pokeball.png'
            return (
                <Link to={`/pokemon/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={p.id}>
                  <div  className='card' style={{ backgroundColor: cardColor }}>
                  {p.id} <br />
                  <img src={imageUrl} alt={p.name} /> <br />
                  {p.name} <br />
                  {p.type.join(' ')} <br />
                  {p.region}
                </div>
                </Link>
            )
        })}
    </>
  )
}

Cards.propTypes = {
    pokemon: PropTypes.array
}
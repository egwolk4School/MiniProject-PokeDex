import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './PokeDetail.css';
import { determineRegion } from '../PokeDex/DexComponents';
import logo from '../../../assets/loading.gif';

export const PokeDetail = () => {
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
  };
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [evolutions, setEvolutions] = useState([]);
  const [forms, setForms] = useState([]);

  const fetchVarietySprites = async (varieties) => {
    const varietiesWithSprites = await Promise.all(varieties.map(async (variety) => {
      const res = await axios.get(variety.pokemon.url);
      return {
        name: variety.pokemon.name,
        sprite: res.data.sprites.other['official-artwork'].front_default,
        id: res.data.id
      };
    }));
    return varietiesWithSprites;
  };

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const nationalDexNumber = res.data.id;
        const region = determineRegion(nationalDexNumber);

        const speciesRes = await axios.get(res.data.species.url);
        const evolutionChainUrl = speciesRes.data.evolution_chain.url;

        const evolutionChainRes = await axios.get(evolutionChainUrl);
        const evolutionsData = await extractEvolutions(evolutionChainRes.data.chain);

        const varietyData = await fetchVarietySprites(speciesRes.data.varieties);

        setPokemon({ ...res.data, region });
        setEvolutions(evolutionsData);
        setForms(varietyData);

        document.title = `Pokedex | ${res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1)}`;
      } catch {
        setError('Failed to fetch Pokémon details');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  const extractEvolutions = async (chain) => {
    const evolutionsList = [];

    const traverseChain = async (evolution) => {
      const speciesName = evolution.species.name;
      const pokeRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${speciesName}`);
      evolutionsList.push({
        name: speciesName,
        sprite: pokeRes.data.sprites.other['official-artwork'].front_default,
        id: pokeRes.data.id 
      });
      if (evolution.evolves_to.length > 0) {
        await Promise.all(evolution.evolves_to.map(traverseChain));
      }
    };

    await traverseChain(chain);
    return evolutionsList;
  };

  if (loading) return <div className="load"><img src={logo} alt="" /></div>;
  if (error) return <div>{error}</div>;
  if (!pokemon) return null;

  
  const primaryType = pokemon.types[0].type.name;
  const backgroundColor = typeColors[primaryType] || '#fff'; 
  return (
    <div className="poke-detail" style={{ backgroundColor }}>
      <h1 className="poke">{pokemon.name}</h1>
      <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
      <div className="deets">
        <ul>
          <li className="iden" id="info">ID: {pokemon.id}</li>
          <li  className="info">Type: {pokemon.types.map(type => type.type.name).join(', ')}</li>
          <li className="info">Weight: {pokemon.weight}</li>
          <li  className="info">Height: {pokemon.height}</li>
          <li  className="info">Region: {pokemon.region}</li>
        </ul>
      </div>

      <div className="deets">
        <h3>Evolutions</h3>
        <ul>
          {evolutions.map(evolution => (
            <li key={evolution.id} className="evol">
              <Link to={`/pokemon/${evolution.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img 
                  className="evol"
                  src={evolution.sprite} 
                  alt={evolution.name} 
                  style={{ width: '150px', height: '150px' }} 
                /><br/>
                <span className="poke">{evolution.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="deets">
        <h3>Varieties</h3>
        <ul>
          {forms.map((form) => (
            <li key={form.id} className="evol">
              <Link to={`/pokemon/${form.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img 
                  className="evol"
                  src={form.sprite} 
                  alt={form.name} 
                  style={{ width: '150px', height: '150px' }} 
                /><br/>
                <span className="poke">{form.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="deets">
        <h3>Stats</h3>
        <ul>
          {pokemon.stats.map(stat => (
            <li key={stat.stat.name} className="info">
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

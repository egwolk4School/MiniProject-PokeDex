import axios from 'axios'

export const regionMapping = {
  'Kanto': [1, 151],
  'Johto': [152, 251],
  'Hoenn': [252, 386],
  'Sinnoh': [387, 493],
  'Unova': [494, 649],
  'Kalos': [650, 721],
  'Alola1': [722, 809],
  'Galar': [810, 898],
  'Hisui': [899, 905],
  'Paldea1': [906, 1009],
  'Kitakami': [1011, 1017],
  'Paldea2': [1018, 1025],
  'Alola2': [10091, 10115]
}

export const determineRegion = (nationalDexNumber) => {
  let region = 'Unknown'
  for (const [key, value] of Object.entries(regionMapping)) {
    if (nationalDexNumber >= value[0] && nationalDexNumber <= value[1]) {
      region = key
      break
    }
  }
  if (region === 'Paldea1' || region === 'Paldea2') {
    return 'Paldea'
  } else if (region === 'Alola1' || region === 'Alola2') {
    return 'Alola'
  }
  return region
}

export const fetchPokemonData = async (results) => {
  return await Promise.all(results.map(async (p) => {
    const pokeRes = await axios.get(p.url)
    const nationalDexNumber = pokeRes.data.id
    const region = determineRegion(nationalDexNumber)
    return {
      id: nationalDexNumber,
      name: pokeRes.data.name,
      sprite: pokeRes.data.sprites.other['official-artwork'].front_default,
      type: pokeRes.data.types.map(typeInfo => typeInfo.type.name),
      region: region
    }
  }))
}
